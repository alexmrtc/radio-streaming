import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioComponent } from './radio.component';
import { By } from '@angular/platform-browser';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('it should show RADIO SINGULAR name', () => {
    it('should show RADIO SINGULAR name', () => {
      expect(component.title).toBe('radio-singulars');
    });

    it('should show a title', () => {
      const title = fixture.nativeElement.querySelector('h1');
      expect(title?.textContent).toBe(component.title);
    });
  });

  describe('it should search radio station by name', () => {
    it('should have an input with the placeholder "Escribe el nombre de la emisora"', () => {
      const inputElement = fixture.nativeElement.querySelector('input');
      const expectedPlaceholder = 'Escribe el nombre de la emisora';

      expect(inputElement.placeholder).toBe(expectedPlaceholder);
    });

    it('should have a search button with "Search" value', () => {
      const buttonElement = fixture.nativeElement.querySelector('button');
      const expectedValue = 'Search';

      expect(buttonElement.textContent).toBe(expectedValue);
    });

    it('should run the search function once', () => {
      const radioStationSpy = jest.spyOn(component, 'searchRadio');

      const buttonElement = fixture.debugElement.query(By.css('button'));

      buttonElement.triggerEventHandler('click', null);

      expect(radioStationSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('list radio', () => {
    it('should have a list', () => {
      const ulElement = fixture.nativeElement.querySelector('ul');

      expect(ulElement).not.toBeNull();
    });

    it('should initialize station list empty', () => {
      const ulElement = fixture.nativeElement.querySelector('ul');
      const liElementArray = ulElement.querySelectorAll('li');

      expect(liElementArray.length).toBe(0);
    });

    it('should render at least one li element when valid search', () => {
      component.filteredRadioStations = [
        { name: 'test', url: 'test', country: 'test' },
      ];
      const radioStationSpy = jest.spyOn(component, 'searchRadio').mockImplementation(() => {
        component.filteredRadioStations = component.radioStations.filter((radio) => {
          return radio.name.includes("8");
        })
      });

      const ulElement = fixture.nativeElement.querySelector('ul');
      const liElementArray = ulElement.querySelectorAll('li');

      const buttonElement = fixture.debugElement.query(By.css('button'));
      buttonElement.triggerEventHandler('click', null);

      fixture.detectChanges();

      expect(liElementArray.length).toBeGreaterThan(0);
    });
  });
});
