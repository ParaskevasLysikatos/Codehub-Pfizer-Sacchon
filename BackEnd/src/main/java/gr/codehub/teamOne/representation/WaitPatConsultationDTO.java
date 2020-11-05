package gr.codehub.teamOne.representation;

import lombok.Data;

import java.util.Date;

@Data
public class WaitPatConsultationDTO {
    private Long patientsId;
    private Date lastConsultationDate;

    public static WaitPatConsultationDTO getWaitPatConsultationDTO(Long mId){
        WaitPatConsultationDTO tempObj = new WaitPatConsultationDTO();
        tempObj.setPatientsId(mId);
        tempObj.setLastConsultationDate(null);
        return tempObj;
    }

    public static WaitPatConsultationDTO getWaitPatConsultationDTO(Long mId, Date mDate){
        WaitPatConsultationDTO tempObj = new WaitPatConsultationDTO();
        tempObj.setPatientsId(mId);
        tempObj.setLastConsultationDate(mDate);
        return tempObj;
    }
}
