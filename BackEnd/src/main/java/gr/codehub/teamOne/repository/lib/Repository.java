package gr.codehub.teamOne.repository.lib;

import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.model.Users;
import gr.codehub.teamOne.representation.LoginCredentialDTO;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Optional;

public abstract class Repository<T, K> implements IRepository<T, K> {

    private EntityManager entityManager;
    public Repository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Optional<T> findById(long id) {
        try {
            entityManager.getTransaction().begin();
            T t = entityManager.find(getEntityClass(), id);
            entityManager.getTransaction().commit();
            return Optional.of(t);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }

    @Override
    public List<T> findAll() {
        TypedQuery<T> query = entityManager.createQuery("from " + getEntityClassName(), getEntityClass());
        return query.getResultList();
    }

    @Override
    public Optional<T> findByEmail(String userEmail) {

        try {
            entityManager.getTransaction().begin();
            T t = (T) findUserWithCredential(userEmail);
            entityManager.getTransaction().commit();
            return Optional.of(t);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }


    @Override
    public Optional<T> save(T t) {
        try {
            entityManager.getTransaction().begin();
            entityManager.persist(t);
            entityManager.getTransaction().commit();
            return Optional.of(t);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }

    @Override
    public boolean deleteById(K id) {

        T persistentInstance = entityManager.find(getEntityClass(), id);

        if (persistentInstance != null) {

            try {

                entityManager.getTransaction().begin();
                entityManager.remove(persistentInstance);
                entityManager.getTransaction().commit();
            } catch (Exception e) {
                return false;
            }
            return true;
        }
        return false;
    }

    public abstract Class<T> getEntityClass();
    public abstract String getEntityClassName();

    /**
     * Method to search user in base, based on email.
     * @param usrEmail String unique email
     * @return user with this email.
     */
    private Users findUserWithCredential(String usrEmail) {
        return (Users) entityManager.createQuery("from Users u where email = :email ")
                .setParameter("email", usrEmail)
                .getResultList()
                .get(0);
    }

}