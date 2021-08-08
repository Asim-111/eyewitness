import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelService } from 'app/services/http.service';
import { ResultService } from 'app/services/result.service';
import { Result } from 'app/train-model/train-model.component';

@Component({
  selector: 'app-test-model',
  templateUrl: './test-model.component.html',
  styleUrls: ['./test-model.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestModelComponent implements OnInit {
  dataSource: Result[] = [];
  displayedColumns: string[] = ['ID', 'Dataset', 'Feature','ClassBalancing', 'Preprocessing', 'Model', 'Validation', 'Metrics','createDate' ,'Action'];
  test: boolean = false;
  selectedModel: string;
  feature: any;
  preprocessing: any;
  dataset : any;
  
  constructor(private resultService: ResultService, private router: Router,private httpService : ModelService) { }
  

  ngOnInit(): void {
    this.httpService.getModels().subscribe(response => {

      this.dataSource = response;
      console.log(response);
    });
  }

  onEdit($event){
    console.log($event)
    this.resultService.updateSelectedResult($event);
    this.router.navigate(['/train-model'])
  }

  onTest($event){
    this.test = true;
    this.selectedModel = $event.modelId;
    this.feature =  $event.Feature;
    this.preprocessing = $event.Preprocessing;
    this.dataset = $event.Dataset;
    console.log($event);
  }

  onBack(){
    this.test = false;
  }

}
