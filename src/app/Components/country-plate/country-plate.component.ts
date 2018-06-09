import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CountryService } from "../../Services/country.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";
import { Country } from "../../Models/Country.model";

@Component({
  selector: 'app-country-plate',
  templateUrl: './country-plate.component.html',
  styleUrls: ['./country-plate.component.scss']
})
export class CountryPlateComponent implements OnInit {

  @Input() country: Country;
  flagPath: string;

  constructor(private route: ActivatedRoute, private countryService: CountryService, private router: Router) {
  }

  ngOnInit() {
    this.flagPath = 'assets/images/flags/' + this.country.tag + '.png';
    //const tag = this.route.snapshot.param['tag'];
  }
}
