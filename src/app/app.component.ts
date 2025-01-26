import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { JSonApiService } from "./j-son-api.service";
import { take } from "rxjs/operators";
import Swal from "sweetalert2";
import { MockDATA } from "./mock-data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "showApiDataWithCard";
  data$: Observable<MockDATA[]>;
  number = 1;
  number2 = 1;
  loadData = [];
  loadData1 = [];
  LoadData$: Observable<MockDATA[]>;
  customError: string;
  // totalnumberofData = new Promise((reslove,reject)=>{
  //   setTimeout(() =>{
  //     reslove(this.loadData1.length);
  //     console.log(this.loadData1.length);
  //   },2000)
  // });
  getEachValue = [];
  //pageOfItems: Array<any>;
  showCard = false;
  isVisible = false;

  constructor(public jsonService: JSonApiService) {}

  ngOnInit() {
    //this.getAllData();
    this.jsonService
      .getJsonValue(this.number)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.loadData1 = res;
        },
        (error) => {
          //console.log(error);
          throw error;
        }
      );
    //this.loadData = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    this.isVisible = true;
  }

  // onChangePage(pageOfItems: Array<any>) {
  //   // update current page of items
  //   this.pageOfItems = pageOfItems;
  // }

  onNextResult() {
    this.jsonService.getNextPage().subscribe((res: MockDATA[]) => {
      console.log("RESNext::----", res);
      this.loadData1 = res;
      this.isVisible = false;
    });
    // this.totalnumberofData = new Promise((reslove,reject)=>{
    //   setTimeout(() =>{
    //     reslove(this.loadData1.length);
    //     console.log(this.loadData1.length)
    //   },2000)
    // });
  }

  onPreviousResult() {
    this.jsonService.getPreviousPage().subscribe((res: MockDATA[]) => {
      console.log("RESPre::----", res);
      this.loadData1 = res;
      if (this.loadData1[0].userId == 1) {
        this.isVisible = true;
      }
    });
  }
  getAllData(value: number) {
    this.jsonService.getJsonValue(value).subscribe(
      (res) => {
        console.log("Result", res);
        this.loadData = res;
        this.getEachValue = res.slice(0, value);
        const Title = this.loadData.find((c) => c.title);
        console.log("loadDATA", this.getEachValue);
        console.log("Title", Title);
        if (this.getEachValue.length > 0) {
          this.showCard = true;
        } else {
          this.showCard = false;
        }
      },
      (error) => {
        console.log(error);
        console.log(error.status);
        if (error.status == "404") {
          Swal.fire({
            icon: "warning",
            title: "Backend Server error",
            text: "The Requested resource does not exists",
          });
          this.customError = "The Requested resource does not exists";
        }
      }
    );
  }

  getAllDataasync(value: number) {
    this.data$ = this.jsonService.getJsonValue(value);
    console.log("this.data$::--", this.data$);
  }
  // getAllDatawithAsync(){
  //   this.LoadData$ = this.jsonService.getJsonValue2();
  //   //this.LoadData$ = this.jsonService.getJsonValue(value);
  //   console.log("v::-",this.LoadData$);
  //   // let res:any;
  //   // res = this.asyncLoadData$
  //   // this.getEachValue = res.slice(0,value);
  //   // if(this.getEachValue.length > 0){
  //   //   this.showCard = true;
  //   // }
  //   // else{
  //   //   this.showCard = false;
  //   // }
  // }

  ngOnDestroy(): void {
    console.log("Destroy");
  }
}
