import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  data = [1,2,3,4,5,6,7];

  searchTag = ['Koahsiung' , 'Taipei' , 'Learning'];

  categoriesTag = [
    {name:'All',checked:''}, 
    {name:'Entertainment',checked:''}, 
    {name:'Food',checked:''}, 
    {name:'Learning',checked:''}, 
    {name:'Outdoors',checked:''}, 
  ];

  showAll = true;
  showSearch = false;

  showDetail(){
    this.showAll = !this.showAll;
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
    this.categoriesTag[index].checked = 'true';
  }

  showSearchBar(){
    this.showSearch = !this.showSearch;
  }

}
