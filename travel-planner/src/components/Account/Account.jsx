import React, { useState, useEffect } from "react";
//import { useNavigate } from 'react-router-dom';
//import { Spinner } from 'react-bootstrap';
import { collection, onSnapshot, where, query, getDocs } from "@firebase/firestore";
import { db } from '../../FireBaseInit';
//import { UserAuth } from "../Context/Context";
import { onAuthStateChanged } from "firebase/auth";

import PastTrip from '../../components/PastTrip/PastTrip'
import ExploreTrips from "../../components/ExploreTrips/ExploreTrips"
import "./Account.css";

let dataArray = [];
let newCities = [];
let pastTripsArray = [];
let futureTripsArray = [];

const Account = ({ user, signout }) => {

  const ref = collection(db, 'usersTrip');
  const dateToday = Date.now();

  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null);
  const [Trips, setTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  const [futureTrips, setFutureTrips] = useState([]);
  const [unvisitedCities, setUnvisitedCities] = useState([]);
  const [visitedCities, setVisitedCities] = useState([]);
  const [readyState, setReadyState] = useState([false])

  useEffect(() => {

    async function fetchUserID() {
      let owner = await user ? user.uid : null;
      console.log('setting user id:', user.uid, owner);
      setUserID(owner);
      setReadyState(true);
    }

    fetchUserID();

  }, [user, onAuthStateChanged]);

  useEffect(() => {
    if (readyState === false) { console.log('awaiting user') }
    const q = query(ref, where('userID', '==', `${userID}`));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data());
      });
      setTrips(dataArray);
      dataArray.forEach((trip) => {
        if (Date.parse(trip.tripDate) < dateToday) {
          pastTripsArray.push(trip)

        }
        else {
          futureTripsArray.push(trip);

        }
      })
      setFutureTrips(futureTripsArray);
      setPastTrips(pastTripsArray);
      resetArrays();
    });
    return () => {

      unsub();
    };
  }, [userID, readyState]);


  const resetArrays = () => {
    dataArray = [];
    futureTripsArray = [];
    pastTripsArray = [];
  }

  useEffect(() => {
    setLoading(false);
    const visitedSights = [];
    const visitedCities = [];
    pastTrips.map((trip) => trip.sights.forEach((sight) => {
      visitedSights.push(sight.sightName)
    }));

    pastTrips.map((trip) => trip.sights.forEach((sight) => {
      visitedCities.push(sight.cityName.toLowerCase())
    }));
    console.log(visitedCities);
    console.log(visitedSights);
    setVisitedCities(visitedCities);


  }, [pastTrips, futureTrips])

  useEffect(() => {
    async function getCities() {
      newCities = [];
      const citySnapshot = await getDocs(collection(db, "cities"));
      citySnapshot.docs.forEach((doc) => {
        if (!visitedCities.includes(doc.data().cityName)) {
          newCities.push(doc.data().cityName);
        }

      });
      console.log(newCities);
      setUnvisitedCities(newCities);

    }
    getCities();
  }, [visitedCities])


  return (
    <div className="account-container">
      <h2 className="title">Your Account</h2>
      {loading ? /* <Spinner color="primary">
        </Spinner>*/ <p>Loading...</p>
        : <>
          <section className="past-trips">
            <h3>You have completed {pastTrips.length} Trips </h3>
            <PastTrip arr={pastTrips} />
          </section>

          <section className="explore-trips">
            <h3>Ready for more?</h3>
            <h4>Explore these places:</h4>
            <ExploreTrips cityArray={unvisitedCities} />
            <p>(links to cities in Explore)</p>

          </section>
          <section className="future-trips">
            <h3>Your upcoming trips:</h3>
            <p>(links to Planner or the profile page being completed by Dang)</p>

          </section>
        </>
      }
    </div>)

}

export default Account;