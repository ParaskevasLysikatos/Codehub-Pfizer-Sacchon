package gr.codehub.teamOne.resource.impl;

import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.model.Measurement;
import gr.codehub.teamOne.model.Users;
import gr.codehub.teamOne.repository.MeasurementRepository;
import gr.codehub.teamOne.repository.UserRepository;
import gr.codehub.teamOne.repository.util.JpaUtil;
import gr.codehub.teamOne.representation.MeasurementDTO;
import gr.codehub.teamOne.representation.MeasurementsSearchParamDTO;
import gr.codehub.teamOne.representation.UsersSearchDTO;
import gr.codehub.teamOne.resource.interfaces.MeasurementResource;
import gr.codehub.teamOne.security.AccessRole;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class MeasurementResourceImpl extends ServerResource implements MeasurementResource {
    private MeasurementRepository measurementRepository;
    private UserRepository userRepository;
    private EntityManager em;
    private Long measurementID;

    @Override
    protected void doInit() throws ResourceException {
        try{
            em = JpaUtil.getEntityManager();
            measurementRepository = new MeasurementRepository(em);
            userRepository = new UserRepository(em);
            String tempMeasurementID = getQueryValue("measurementID");
            measurementID = (tempMeasurementID != null) ? Long.parseLong(getQueryValue("measurementID")) : null;
        }catch(Exception e) {
            throw new ResourceException(e);
        }
    }

    @Override
    protected void doRelease() throws ResourceException {
        em.close();
    }

    @Override
    public MeasurementDTO getSpecificMeasurement() throws BadEntityException, NotFoundException {

        if(measurementID == null) throw new BadEntityException("You gave a wrong measurement ID");

        Optional<Measurement> tempMeasurement = measurementRepository.findById(measurementID);
        if(!tempMeasurement.isPresent()) throw new NotFoundException("No measurement found with this id");

        return MeasurementDTO.getMeasurementDTO(tempMeasurement.get());
    }

    @Override
    public String deleteMeasurement() throws NotFoundException, BadEntityException {

        if (measurementID==null) throw new BadEntityException("Null object as input");
        measurementRepository.deleteById(measurementID);
        return "Successfully deleted";
    }

    @Override
    public MeasurementDTO updateMeasurement(MeasurementDTO measurementDTO) throws NotFoundException, BadEntityException {

        if(measurementDTO == null) throw new BadEntityException("Null measurement Exception error");
        if(measurementDTO.getMeasurementID() == null) throw new BadEntityException("No measurement id to update");

        Optional<Measurement> demandMeasurement = measurementRepository.findById(measurementDTO.getMeasurementID());
        if(!demandMeasurement.isPresent()) throw new NotFoundException("Not such measure");

        Measurement measurementToUpdate = MeasurementDTO.updateMeasurement(demandMeasurement.get(), measurementDTO);
        measurementRepository.save(measurementToUpdate);

        return measurementDTO;
    }

    @Override
    public String addMeasurement(MeasurementDTO measurementDTO) throws NotFoundException, BadEntityException {

        String usrEmail = this.getRequest().getClientInfo().getUser().getIdentifier();

        if(measurementDTO == null) throw new BadEntityException("Null measurement Exception error");

        Optional<Users> demandedUser = userRepository.findByEmail(usrEmail);

        if(!demandedUser.isPresent() || !demandedUser.get().isActive()) throw new NotFoundException("Not such user or the account is inactive");

        measurementDTO.setUser(demandedUser.get().getId());

        Measurement measurementToSave = MeasurementDTO.getMeasurement(measurementDTO);
        measurementToSave.setUser(demandedUser.get());
        measurementRepository.save(measurementToSave);
        return "Measurement saved";
    }

    @Override
    public List<MeasurementDTO> getAllMeasurementsBasedOn(MeasurementsSearchParamDTO paramDTO) throws NotFoundException, BadEntityException {

        Users patient;
        if(paramDTO.getUserID() == null && paramDTO.getAmka() != null){
            UsersSearchDTO usersSearchDTO = new UsersSearchDTO();
            usersSearchDTO.setAmka(paramDTO.getAmka());
            usersSearchDTO.setRole(AccessRole.ROLE_PATIENT);
            patient = userRepository.findByAmka(usersSearchDTO);
            if(patient == null) throw new BadEntityException("Wrong patient AMKA");
            paramDTO.setUserID(patient.getId());
        }

        List<Measurement> listWithMeasurements = measurementRepository.getSpecificMeasurements(paramDTO);
        List<MeasurementDTO> listWithDTO = new ArrayList<>();
        listWithMeasurements.forEach( ms -> listWithDTO.add(MeasurementDTO.getMeasurementDTO(ms)));

        return listWithDTO;
    }
}
