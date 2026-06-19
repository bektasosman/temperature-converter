import { Component, signal, computed } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface TemperatureResponse {
  convertedTemperature: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [MatInputModule, FormsModule, MatFormFieldModule],
  styleUrl: './app.css'
})


export class App {

  result = signal<number | null>(null);
  readonly baseUrl = 'http://localhost:8080/TemperatureMeasurement';

  constructor(
    private http: HttpClient,
  ) { }


  // 1. Die "Source of Truth" (Der Zustand)
  private currentTemp = signal<number | null>(null);
  private currentUnit = signal<'C' | 'F'>('C');

  protected celsiusValue = computed(() => {
    const temp = this.currentTemp();
    const unit = this.currentUnit();

    if (temp === null) return '';
    if (unit === 'C') return temp;

    return this.result() ?? '';
  });

  protected fahrenheitValue = computed(() => {
    const temp = this.currentTemp();
    const unit = this.currentUnit();

    if (temp === null) return '';
    if (unit === 'F') return temp;

    return this.result() ?? '';

  });

  private callBackend(path: string): void {
    const finalUrl = `${this.baseUrl}/${path}/${this.currentTemp()}`;
    this.http.get<TemperatureResponse>(finalUrl)
      .subscribe({
        next: response => this.result.set(response.convertedTemperature),
        error: error => console.error(error)
      });
  }

  onCelsiusInput(value: string) {
    if (value === '') {
      this.currentTemp.set(null);
      return;
    }
    this.currentUnit.set('C');
    this.currentTemp.set(parseFloat(value));
    this.callBackend("celsius-to-fahrenheit");
  }

  onFahrenheitInput(value: string) {
    if (value === '') {
      this.currentTemp.set(null);
      return;
    }
    this.currentUnit.set('F');
    this.currentTemp.set(parseFloat(value));
    this.callBackend("fahrenheit-to-celsius")
  }

  getfluidHeight(): number {
    const celsius = this.getCelsius();

    if (celsius <= 0) return 5;
    if (celsius >= 50) return 100;

    return (celsius / 50) * 100;
  }

  getfluidColor(): string {
    const celsius = this.getCelsius();

    if (celsius < 15) return '#2196F3';
    if (celsius < 30) return '#FF9800';

    return '#F44336';
  }

  private getCelsius(): number {
    return Number(this.celsiusValue()) || 0;
  }
}
