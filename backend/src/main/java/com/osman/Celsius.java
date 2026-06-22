package com.osman;

public class Celsius implements TempUnit {

    @Override
    public double fromKelvin(double value) {
        return value - 273.15;
    }

    @Override
    public double toKelvin(double value) {
        return 273.15 + value;
    }

    @Override
    public String getName(){
        return "Celsius";
    }
}
