import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Result } from 'app/train-model/train-model.component';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class ModelService {
    base_url = 'http://localhost:5000/'
 
    constructor(private http:HttpClient) {}

    postModel(data: any){
        let url = this.base_url + 'train';
        return this.http.post(url, data, httpOptions)
    }

    saveModel(data: any){
        let url = this.base_url + 'save-model';
        return this.http.post(url, data, httpOptions)
    }

    predictModel(modelId: string, preprocessing: string, feature: string,dataset: string, text: string){
        let url = this.base_url + 'predict';
        console.log(dataset)
        return this.http.get(url, {
            params: {
                modelId: modelId,
                preprocessing: preprocessing,
                feature: feature,
                dataset: dataset,
                text: text
            },
            headers: httpOptions.headers
        })
    }
    getModels(){
        let url = this.base_url + 'get-all';
        return this.http.get(url, httpOptions).pipe(
            map(response => response['data']),
            map(dataList => {
                let resultList: Result[] = [];
                let count = 1;
                dataList.forEach(element => {
                    const result: Result = {
                            Dataset: element['dataset'],
                            Feature: element['feature'],
                            ID: count++,
                            Metrics: `Accuracy:${element['accuracy']} Precision:${element['precision']} Recall:${element['recall']} F1-Score:${element['f_score']}`,
                            Model: element['ml_model'],
                            Preprocessing: element['pre_processing'],
                            Validation: element['validation'],
                            createDate: element['created_date'],
                            modelId: element['model_uuid'],
                            classBalancing: element['class_balancing']
                    }
                    resultList.push(result);
                });
                return resultList;
            })
        )
    }






}