package com.osman;

public class Fahrenheit implements TempUnit {

    @Override
    public double fromKelvin(double unit) {
        return (unit - 273.15) * 9.0 / 5.0 + 32;
    }

    @Override
    public double toKelvin(double unit) {
        return (unit - 32) * 5.0 / 9.0 + 273.15;
    }

    @Override
    public String getName(){
        return "Fahrenheit";
    }
}