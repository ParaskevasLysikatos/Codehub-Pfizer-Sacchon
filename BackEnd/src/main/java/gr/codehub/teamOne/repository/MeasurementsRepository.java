package gr.codehub.teamOne.repository;

import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.model.Measurement;
import gr.codehub.teamOne.model.Users;
import gr.codehub.teamOne.repository.lib.Repository;
import gr.codehub.teamOne.representation.MeasurementsSearchParamDTO;
import gr.codehub.teamOne.representation.UsersSearchDTO;

import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

public class MeasurementsRepository extends Repository<Measurement, Long> {

    private EntityManager entityManager;

    public MeasurementsRepository(EntityManager entityManager) {
        super(entityManager);
        this.entityManager = entityManager;
    }

    @Override
    public Class<Measurement> getEntityClass() {
        return Measurement.class;
    }

    @Override
    public String getEntityClassName() {
        return Measurement.class.getName();
    }

    public List getSpecificMeasurements(MeasurementsSearchParamDTO paramDTO) throws BadEntityException, NotFoundException {

        if (paramDTO == null) throw new BadEntityException("Wrong input model");

        String mQuery = "from Users u where";

        if (paramDTO.getUserID() != null) {
            mQuery += " user_id = :userid";
        }
        if (paramDTO.getStartAt() != null && paramDTO.getEndAt() != null) {

            mQuery += paramDTO.getUserID() != null ? " and " : " ";
        }
        Query baseQuery = entityManager.createQuery(mQuery)
                .setParameter("userid", paramDTO.getUserID());


        List listWithMeasurements = baseQuery.getResultList();

        if (listWithMeasurements.size() == 0) throw new NotFoundException("Not found measurements");
        return listWithMeasurements;
    }
}