import { Component, OnInit } from "@angular/core";
import { NativeChatConfig } from "@progress-nativechat/nativescript-nativechat";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";

import { Car } from "../shared/car.model";
import { CarService } from "../shared/car.service";

/* ***********************************************************
* This is the item details component in the master-detail structure.
* This component retrieves the passed parameter from the master list component,
* finds the data item by this parameter and displays the detailed data item information.
*************************************************************/
@Component({
    selector: "CarInsurance",
    moduleId: module.id,
    templateUrl: "./car-insurance.component.html"
})
export class CarInsuranceComponent implements OnInit {
    nativeChatConfig: NativeChatConfig;
    private _car: Car;

    constructor(
        private _carService: CarService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        this._pageRoute.activatedRoute
        .pipe(switchMap((activatedRoute) => activatedRoute.params))
        .forEach((params) => {
            const carId = params.id;
            this._car = this._carService.getCarById(carId);
        });
        this.nativeChatConfig = {
            botId: "5b3a83534eeb2f4ee5d99da4",
            channelId: "9e48b0dc-8cdb-4e79-9ce0-6595e8ab2da3",
            channelToken: "1b45111f-d2f1-49ff-8531-4980ad1fcceb",
            /*user: {
                name: "John Smith"
            },*/
            session: {
                clear: true
                // userMessage: "Get Car Insurance"
                /*context: {
                    company: 'Progress Software',
                    phone: '555 555 5555'
                }*/
            }
        };
    }

    get car(): Car {
        return this._car;
    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    /* ***********************************************************
    * The master-detail template comes with an example of an item edit page.
    * Check out the edit page in the /cars/car-detail-edit folder.
    *************************************************************/
}
