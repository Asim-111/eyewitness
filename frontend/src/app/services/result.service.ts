import { Injectable } from '@angular/core';
import { Result } from 'app/train-model/train-model.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
    private results: Result[] = [];
    private selectedResult: Result = null;
    // {
    //     Dataset: "EarthQuake",
    //     Feature: "Part of Speech Tagging",
    //     ID: 1,
    //     Metrics: "Accuracy:78 Precision:44 Recall:66 F1-Score:67",
    //     Model: "Random Forest",
    //     Preprocessing: "Stopwords Removal",
    //     Validation: "10-fold Cross Validation",
    //     createDate: new Date(),
    //     modelId: "5a800358-8a07-4099-89fe-de4101e65e71"
    // }
    private resultSubject: BehaviorSubject<Result[]> = new BehaviorSubject(this.results);
    private selectedResultSubject: BehaviorSubject<Result> = new BehaviorSubject(this.selectedResult);

    constructor() {}

    public addToResult(result: Result){
        result.ID = this.results.length + 1;
        this.results.push(result);
        this.resultSubject.next(this.results);
    }

    public updateSelectedResult(result: Result){
        this.selectedResult = result;
        this.selectedResultSubject.next(this.selectedResult);
    }

    public getResults(){
        return this.resultSubject;
    }

    public getSelectedResults(){
        return this.selectedResultSubject;
    }

    public clearResults(){
        this.results = [];
        this.resultSubject.next(this.results);
    }

}