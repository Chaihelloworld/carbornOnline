import { useEffect, useState } from 'react';
import styles from '../styles/stylecss.module.css'; // Import the CSS module

const FriendsList = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=12')
      .then((response) => response.json())
      .then((data) => {
        setPeople(data.results);
      })
      .catch((error) => console.error(error.toString()));
  }, []);

  return (
    <div className={styles.body}>
        <br/>
      <h1 className={styles.greeting}>รายชื่อผู้ร่วมกิจกรรม</h1>
      <div className={styles.container}>
        {people.map((person, index) => (
          <div className={styles.card} key={index}>
            <div className="text-container">
              <p className={styles.name}>{person.name.first}</p>
              <p className={styles.location}>🏡 {person.location.state}</p>
            </div>
            <div className="img-container">
              <img src={person.picture.medium} alt={`Profile of ${person.name.first}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
