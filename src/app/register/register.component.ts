import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

	dateBirth: string | undefined;

	// constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) { }

	ngOnInit(): void {
	}

	// parse date as per dd/mm/yyyy
	parseDate (dateBirth: any) {
		let day = dateBirth.day;
		let month = dateBirth.month;
		let year = dateBirth.year;
		let finalDate : String;

		if (month < 10 && day < 10) {
			finalDate = `0${day}/0${month}/${year}`;
		} else if (month < 10 && day > 9) {
			finalDate = `${day}/0${month}/${year}`;
		} else if (day < 10 && month > 9) {
			finalDate = `0${day}/${month}/${year}`;
		} else {
			finalDate = `${day}/${month}/${year}`;
		}

		return finalDate;
	}

	onSubmit(f: NgForm) {
		console.log(f.value);
		console.log(this.parseDate(f.value.dateOfBirth));
	}

}
