package gr.codehub.teamOne.repository.lib;

import java.util.List;
import java.util.Optional;

public interface IRepository<T, K> {

    Optional<T> findById(long id);

    Optional<T> findByEmail(String userEmail);

    Optional<T> save(T t);

    List<T> findAll();

    boolean deleteById(K id);
}
