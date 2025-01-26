import { TestBed } from "@angular/core/testing";

import { ErrorCatchingInterceptor } from "./error-catching.interceptor";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HandleErrorService } from "../errorHandling/handle-error.service";
import { ToastrModule, ToastrService } from "ngx-toastr";

describe("ErrorCatchingInterceptor", () => {
  let http;
  let httpMock;
  let handleErrorService;
  let toastrServiceMock: Partial<ToastrService>;

  beforeEach(() => {
    toastrServiceMock = {
      error: jasmine.createSpy("error"),
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule],
      providers: [
        { provide: ToastrService, useValue: toastrServiceMock },
        ErrorCatchingInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorCatchingInterceptor,
          multi: true,
        },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    handleErrorService = TestBed.inject(HandleErrorService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    const interceptor: ErrorCatchingInterceptor = TestBed.inject(
      ErrorCatchingInterceptor
    );
    expect(interceptor).toBeTruthy();
  });

  it("should pass through if the response is HttpResponse", () => {
    const mockData = {
      body: [
        {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        },
        {
          userId: 1,
          id: 2,
          title: "qui est esse",
          body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        },
        {
          userId: 1,
          id: 3,
          title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
          body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
        },
        {
          userId: 1,
          id: 4,
          title: "eum et est occaecati",
          body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
        },
        {
          userId: 1,
          id: 5,
          title: "nesciunt quas odio",
          body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
        },
        {
          userId: 1,
          id: 6,
          title: "dolorem eum magni eos aperiam quia",
          body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
        },
        {
          userId: 1,
          id: 7,
          title: "magnam facilis autem",
          body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
        },
        {
          userId: 1,
          id: 8,
          title: "dolorem dolore est ipsam",
          body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
        },
        {
          userId: 1,
          id: 9,
          title: "nesciunt iure omnis dolorem tempora et accusantium",
          body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
        },
        {
          userId: 1,
          id: 10,
          title: "optio molestias id quia eum",
          body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error",
        },
      ],
      status: 200,
    };
    //const interceptor = TestBed.inject(ErrorCatchingInterceptor);

    http
      .get("https://jsonplaceholder.typicode.com/posts?userId=")
      .subscribe((res: HttpResponse<unknown>) => {
        expect(res).toBeTruthy();
        expect(res.status).toBe(mockData.status);
        expect(res.body).toEqual(mockData.body);
      });

    const request = httpMock.expectOne(
      "https://jsonplaceholder.typicode.com/posts?userId="
    );
    request.flush(mockData);
  });

  it("should handle error if the response is HttpErrorResponse", () => {
    spyOn(handleErrorService, "handleError");

    //const interceptor = TestBed.inject(ErrorCatchingInterceptor);

    http.get("https://jsonplaceholder.typicode.com/").subscribe(
      () => {
        fail("Request should have failed");
      },
      (error: HttpErrorResponse) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(404);
        expect(handleErrorService.handleError).toHaveBeenCalledWith(error);
      }
    );

    const request = httpMock.expectOne("https://jsonplaceholder.typicode.com/");
    request.flush("Not Found", { status: 404, statusText: "Not Found" });
  });
});
