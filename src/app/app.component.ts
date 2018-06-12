import { Component, OnInit } from '@angular/core';
import { DataService } from '../../e2e/app/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {animate, state, style, transition, trigger, keyframes} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        animate(300, keyframes([
          style({opacity: 0}),
          style({opacity: 1})
        ]))
      ])
    ])
  ]
})
export class AppComponent implements OnInit{

  title = 'app';

  searchTag = ['Koahsiung' , 'Taipei' , 'Learning'];

  categoriesTag = [
    {id:'00',name:'全部',checked:''}, 
    {id:'01',name:'異國料理',checked:''}, 
    {id:'02',name:'火烤料理',checked:''}, 
    {id:'03',name:'中式美食',checked:''}, 
    {id:'04',name:'夜市小吃',checked:''}, 
    {id:'05',name:'甜點冰品',checked:''},
    {id:'06',name:'伴手禮',checked:''},
    {id:'07',name:'地方特產',checked:''},
    {id:'08',name:'素食',checked:''},
    {id:'09',name:'其他',checked:''},

  ];

  
  showAll = true;
  showSearch = false;

  allFoodData;
  foodData;

  singleData;

  constructor(private http: HttpClient) {
    this.http.get('https://waiwai0308.github.io/week2-filter/assets/data.json').subscribe(data => {
      this.allFoodData = data;
      this.foodData =  this.allFoodData.slice(0,50);
    });
  }

  ngOnInit(){

  }

  showDetail(data){
    this.showAll = !this.showAll;
    this.singleData = data;
  }

  deleteSearchTag(i){
    console.log(i);
    this.searchTag.splice(i,1);
  }

  addFilter(selectZone){
    let locationDiff = this.searchTag.indexOf(selectZone.value);
    if( locationDiff == -1 && selectZone.value) {
      this.searchTag.push(selectZone.value);
    }
    let categoriesFilter = this.categoriesTag.filter( item =>{
      if(item.checked == 'true'){
        return item.name;
      }
    })
    categoriesFilter.forEach( item =>{
      if( this.searchTag.indexOf(item.name) == -1) {
        this.searchTag.push(item.name);
      }
    });
    
  }

  onSearchEnter(data){
    let locationDiff = this.searchTag.indexOf(data);
    if( locationDiff == -1 && data) {
      this.searchTag.push(data);
    }
  }

  toggleEditable(index) {
    if(this.categoriesTag[index].checked == 'true') {
      this.categoriesTag[index].checked = 'false';
    }else{
      this.categoriesTag[index].checked = 'true';
    }
    
  }

  showSearchBar(){
    this.showSearch = !this.showSearch;
  }

}
