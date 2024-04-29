import { Component, OnInit } from '@angular/core';
import radios from '../../data/radio-stations.json';
import { Radio } from './radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss'
})
export class RadioComponent implements OnInit{  
  radioStations:Radio[] = [];
  title ='radio-singulars';
  inputValue!:string;
  filteredRadioStations!:Radio[];

  ngOnInit(): void {
    this.radioStations = radios;
  }


  searchRadio() {
    this.filteredRadioStations = this.radioStations.filter((radio:Radio) => {
      return radio.name.includes(this.inputValue);
    })
  }
}
