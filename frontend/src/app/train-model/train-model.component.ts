import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModelService } from 'app/services/http.service';
import { ResultService } from 'app/services/result.service';
import { ViewDataDialogComponent } from './view-data-dialog/view-data-dialog.component';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

export class CSVRecord {  
	public text: string;  
	public label: string;   
}

export interface Result {
  ID: number
  Dataset: string;
  Feature: string;
  Preprocessing: string;
  Model: string;
  Validation: string;
  Metrics: string;
  createDate: Date;
  modelId: string;
  classBalancing : boolean;
}

@Component({
  selector: 'app-train-model',
  templateUrl: './train-model.component.html',
  styleUrls: ['./train-model.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class TrainModelComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;

  isEditable = true;

  task: Task = {
    name: 'Evaluation Metrics',
    completed: true,
    color: 'warn',
    subtasks: [
      {name: 'Accuracy', completed: true, color: 'primary'},
      {name: 'Precision', completed: true, color: 'primary'},
      {name: 'Recall', completed: true, color: 'primary'},
      {name: 'F1-Score', completed: true, color: 'primary'}
    ]
  };
  allComplete: boolean = true;
  enableSlider: boolean = false;
  tableData1: TableData;
  records: any[] = []; 
  enableViewButton: boolean = false;
  isSpinner: boolean = false;
  response: any;
  displayResults: boolean;
  isSaved: boolean;
  result: any;
  disableP3: boolean = false;
  @ViewChild('csvReader') csvReader: any;  

  constructor(private _formBuilder: FormBuilder, 
              private dialog: MatDialog,
              private modelService: ModelService,
              private _snackBar: MatSnackBar,
              private resultService: ResultService) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      dataset: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      preprocessing: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      feature: ['', Validators.required],
      classBalancing : [false,Validators.required]
    });
    this.forthFormGroup = this._formBuilder.group({
      machineLearning: ['', Validators.required],
      validation: ['', Validators.required],
      slider: [70]
    });

    this.forthFormGroup.get('validation').valueChanges.subscribe(val => {
      val === 'Hold-Out Method' ? this.enableSlider = true : this.enableSlider = false;
    });

    this.thirdFormGroup.get('feature').valueChanges.subscribe(val => {
      val === 'Part of Speech Tagging' ? this.disableP3 = true : this.disableP3 = false;
    });

    this.tableData1 = {
      headerRow: [ 'Text', 'Label'],
      dataRows: []
    };
    this.patchValues();
  }

  patchValues(){
    this.resultService.getSelectedResults().subscribe(result => {
      console.log(result)
      if(result){
        this.firstFormGroup.patchValue({
          dataset: result.Dataset
        })
        this.secondFormGroup.patchValue({
          preprocessing: result.Preprocessing
        })
        this.thirdFormGroup.patchValue({
          feature: result.Feature
        })
        this.forthFormGroup.patchValue({
          machineLearning: result.Model,
          validation: result.Validation
        })
      }
    })
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ViewDataDialogComponent, {
      data: {
        tableData1: this.tableData1
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  uploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        this.tableData1.dataRows = this.records;
        this.enableViewButton = true;
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }
  
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord();  
        // csvRecord.text = curruntRecord[0].trim();  
        // csvRecord.label = curruntRecord[1].trim();
        const text = curruntRecord[0].trim();  
        const label = curruntRecord[1].trim();

        csvArr.push([text, label]);  
      }
    }  
    return csvArr;  
  }  
  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];
    this.enableViewButton = false;
  }

  trainModel(){
    this.isSpinner = true;
    this.isSaved = false;
    this.displayResults = false;
    let json = {
      "dataset": this.firstFormGroup.get('dataset').value,
      "preprocessing": this.secondFormGroup.get('preprocessing').value,
      "feature": this.thirdFormGroup.get('feature').value,
      "machineLearning": this.forthFormGroup.get('machineLearning').value,
      "validation": this.forthFormGroup.get('validation').value,
      "slider": this.forthFormGroup.get('slider').value,
      "classbalancing": this.thirdFormGroup.get('classBalancing').value
    }

    console.log(json)
    this.modelService.postModel(json).subscribe(response => {
      console.log(response);
      this.response = response;
      let result = {
        ...json,
        "accuracy": response['accuracy'],
        "precision": response['precision'],
        "recall": response['recall'],
        "f1score": response['f1score'],
        "modelId": response['model_id'],
      
      }
      // let result: Result = {
      //   ID: 0,
      //   Dataset: json.dataset,
      //   Feature: json.feature,
      //   Preprocessing: json.preprocessing,
      //   Model: json.machineLearning,
      //   Validation: json.validation,
      //   Metrics: '',
      //   modelId: response['model_id'],
      //   createDate: response['create_date']
      // }
      // let temp = []
      // this.task.subtasks.forEach(task => {
      //   if (task.completed){
      //     temp.push(`${task.name}:${response[task.name.toLowerCase().replace('-', '')]}`)
      //   }
      // })
      // result.Metrics = temp.join(' ');
      this.isSpinner = false;
      console.log(result);
      this.result = result;
    })
  }

  onDisplay(){
    this.displayResults = true;
  }

  onSave(){
    if(this.isSaved){
      this.openSnackBar('Model Is Already Saved', 'Close')

    }
    else{
      this.isSaved = true;
      this.openSnackBar('Model Saved!!!', 'Close');
      this.modelService.saveModel(this.result).subscribe(a => console.log(a));
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  
  ngOnDestroy(){
    this.resultService.updateSelectedResult(null);
  }

}
