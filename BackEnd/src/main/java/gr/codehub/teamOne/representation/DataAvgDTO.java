package gr.codehub.teamOne.representation;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DataAvgDTO {

    private long patientID;
    //The number of data. Based on them we calculate the averages
    private int numbersOfData;
    private Float avgBloodGlucoseLevel;
    private Long avgCarbIntakeAVG;

    public static DataAvgDTO getDataAvg(Object mObj){
//        List<Double> asd = mObj.toString();
        DataAvgDTO dataAvgDTO = new DataAvgDTO();
//        dataAvgDTO.setAvgCarbIntakeAVG(customData[0]);
//        dataAvgDTO.setAvgBloodGlucoseLevel((Float) mObj[0]);
//        dataAvgDTO.setNumbersOfData();
//        dataAvgDTO.setPatientID();
        return null;
    }
}
