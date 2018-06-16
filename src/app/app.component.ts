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

  searchTag = [];

  categoriesTag = [
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

  area =[
    {Zone:"桃源區"},{Zone:"三民區"},{Zone:"甲仙區"},{Zone:"六龜區"},
    {Zone:"杉林區"},{Zone:"內門區"},{Zone:"茂林區"},{Zone:"美濃區"},
    {Zone:"旗山區"},{Zone:"田寮區"},{Zone:"茄萣區"},{Zone:"湖內區"},
    {Zone:"阿蓮區"},{Zone:"路竹區"},{Zone:"永安區"},{Zone:"岡山區"},
    {Zone:"燕巢區"},{Zone:"彌陀區"},{Zone:"橋頭區"},{Zone:"大樹區"},
    {Zone:"梓官區"},{Zone:"大社區"},{Zone:"楠梓區"},{Zone:"仁武區"},
    {Zone:"左營區"},{Zone:"鳥松區"},{Zone:"三民區"},{Zone:"鼓山區"},
    {Zone:"大寮區"},{Zone:"鳳山區"},{Zone:"苓雅區"},{Zone:"新興區"},
    {Zone:"前金區"},{Zone:"鹽埕區"},{Zone:"旗津區"},{Zone:"前鎮區"},
    {Zone:"小港區"},{Zone:"林園區"}];


  categoriesTagChecked=[];
  selectedZone='';
  
  showAll = true;
  showSearch = false;

  basicFoodData;
  allFoodData;
  foodData;

  singleData;

  pagination = {
    nowPage: 1,
    totalPage: [],
    maxPage: 0
  };

  constructor(private http: HttpClient) {
    this.http.get('https://waiwai0308.github.io/week2-filter/src/assets/data.json').subscribe(data => {
      this.basicFoodData = data;
      this.filterData();
      this.countPage();
    });
  }

  ngOnInit(){

  }

  filterData(){
    
    this.allFoodData = this.basicFoodData.filter((item)=>{
        return item;
    });

    if(this.selectedZone !== ''){
      this.allFoodData = this.allFoodData.filter((item)=>{
        if(item.Add.indexOf(this.selectedZone)> -1){
          return item;
        }
      });  
    }

    if(this.categoriesTagChecked.length > 0){
      this.allFoodData = this.allFoodData.filter((item)=>{
        for(let i = 0; i <= this.categoriesTagChecked.length; i++){
          if(item.Class.indexOf(this.categoriesTagChecked[i])> -1){
            return item;
          }
        }
      });  
    }

    let pageDataStart = (this.pagination.nowPage - 1)*10;
    let pageDataEnd = (this.pagination.nowPage - 1)*10 + 9;
    this.foodData =  this.allFoodData.filter((element,index) => {
      return pageDataStart <= index && index <= pageDataEnd;
    });

    this.countPage();
  }

  countPage(){
    this.pagination.maxPage = Math.ceil(this.allFoodData.length / 10);

    this.pagination.totalPage.length = 0;
    let startPage = 1;
    let endPage = 9;

    if(this.pagination.maxPage < 10){
      endPage =this.pagination.maxPage;
    }else{
      if(this.pagination.nowPage > 5){
        startPage = this.pagination.nowPage - 4;
        endPage =this.pagination.nowPage + 4;
      }
      if(this.pagination.nowPage > this.pagination.maxPage - 4){
        startPage = this.pagination.maxPage - 8;
        endPage = this.pagination.maxPage;
      }
    }
    

    for(let i = startPage;i <= endPage; i++){
      this.pagination.totalPage.push(i);
    }
  }

  showDetail(data){
    this.showAll = !this.showAll;
    this.singleData = data;
  }

  deleteSearchTag(i){
    this.searchTag.splice(i,1);
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

    this.categoriesTagChecked.length = 0;
    this.categoriesTag.forEach( item =>{
      if( item.checked == 'true') {
        this.categoriesTagChecked.push(item.id);
      }
    });
    this.pagination.nowPage = 1;
    this.filterData();
  }

  showSearchBar(){
    this.showSearch = !this.showSearch;
  }

  changePage(item){
    if(item == 'pre') {
      if(this.pagination.nowPage == 1){
        return;
      }
      this.pagination.nowPage--;
    }else if(item == 'next'){
      if(this.pagination.nowPage == this.pagination.maxPage){
        return;
      }
      this.pagination.nowPage++;
    }else{
      this.pagination.nowPage = item;
    }

    this.filterData();
  }

  selectZone(zone){
    this.selectedZone=zone;
    this.filterData();
  }

}
