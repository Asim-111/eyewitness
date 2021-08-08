import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModelService } from 'app/services/http.service';

@Component({
  selector: 'app-test-prediction',
  templateUrl: './test-prediction.component.html',
  styleUrls: ['./test-prediction.component.css']
})
export class TestPredictionComponent implements OnInit {
  enableText: boolean = false;
  @Input() modelId: string;
  @Input() preprocessing: string;
  @Input() feature: string;
  @Input() dataset: string;
  @Output() onBackEvent: EventEmitter<any> = new EventEmitter();
  showResult: boolean;
  file: File;
  text: string;
  result: any;

  constructor(private modelService: ModelService) { }

  ngOnInit(): void {
  }

  onBack(){
    this.onBackEvent.emit(true)
  }

  onCheck(){
    this.enableText = !this.enableText;
  }

  onPredict(){
    console.log(this.modelId);
    this.modelService.predictModel(this.modelId, this.preprocessing, this.feature,this.dataset, this.text).subscribe((response: any) => {
      
      console.log(response);
      this.result = response.result.toUpperCase();
      this.showResult = true;
    })
  }

  uploadListener($event){
    if($event.target.files.length == 0){
      return
    }
    let file: File = $event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const text: string = <string>fileReader.result;
      this.text = text;
    }
    fileReader.onerror = function () {
      console.log('Error occured while reading file!');  
    };
    fileReader.readAsText(file);
  }

  disablePredict(){
    if (!this.text){
      return true;
    }
    this.text?.length == 0 ? true : false;
  }

}
