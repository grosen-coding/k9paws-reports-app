import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
// import { FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'

function MainReportsPage() {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [initialBreedInfo, setInitialBreedInfo] = useState([]);
  const [breedSearchResult, setBreedSearchResult] = useState();
  // const [displayBreedInfo, setDisplayBreedInfo] = useState();

  useEffect(()=>{
    axios({
        method: `GET`,
        dataResponse: "json",
        url: `https://api.thedogapi.com/v1/breeds`,
        params: {
          header: { "x-api-key": "87b32cf2-45c7-420a-b1ff-ff8cac38bc2b" },
          // query: userSearchInput,
        },
      }).then((response) => {
        setInitialBreedInfo(response.data);
        
        console.log(response.data);
      });

  },[])

  const handleSearch = (event, userSearchInput) => {
    event.preventDefault();

    console.log(initialBreedInfo[0])

    const filteredBreedInfo = initialBreedInfo.filter((breed)=>{
        console.log(breed);
        return (breed.bred_for?.toLowerCase().includes(userSearchInput) || breed.breed_group?.toLowerCase().includes(userSearchInput) || breed.origin?.toLowerCase().includes(userSearchInput) || breed.name?.toLowerCase().includes(userSearchInput) || breed.temperament?.toLowerCase().includes(userSearchInput) || breed.description?.toLowerCase().includes(userSearchInput)) 
      })

      setBreedSearchResult(filteredBreedInfo)
  };

  return (
    <section className="breed-info">
      <div className="wrapper">

        <div className="breed-info--container">
          <div className="breed-info--search">
            <h1 className="breed-info--title-main">Breed search</h1>
            <p className="breed-info--title-sub">Welcome to the Breed Information API. Type in any keyword below (breed name, country, breed traits or personality traits, etc...) to learn more about all dog breeds! </p>

            <div className="breed-info--search-form form">
              <form
                onSubmit={(event) => {
                  handleSearch(event, userSearchInput);
                }}
                action="search">
                
                <div className="form-group">
                  <label htmlFor="searchBar"></label>
                  <input
                    onChange={(event) => {
                      setUserSearchInput(event.target.value);
                    }}
                    value={userSearchInput}
                    type="text"
                    name="searchBar"
                    id="searchBar"
                    placeholder="Search"
                    className="form-control"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-block">Search</button>
              </form>
            </div>
          </div>

          <div className="breed-info--results-container">
              <ul>
            {breedSearchResult?.map((breedInfo) => {
                return (
                //   <Link to={`/blog/blog_list/${post.name.urlLink}`}>
                      <div className="breed-info--results-card">
                        <li key={breedInfo.id}>

                          <div className="breed-info--results-back">
                            <div className="breed-info--results-name">
                              <h3>{breedInfo.name}</h3>
                            </div>
                            <p className="breed-info--results-item">
                              <strong>bred for:</strong> {breedInfo.bred_for}
                            </p>
                            <p className="breed-info--results-item">
                              <strong>breed group:</strong> {breedInfo.breed_group}
                            </p>
                            <p className="breed-info--results-item">
                              <strong>temperament:</strong> {breedInfo.temperament}
                            </p>
                            <p className="breed-info--results-item">
                              <strong>life span:</strong> {breedInfo.life_span}
                            </p>
                          </div>

                          <div className="breed-info--results-front">  
                              <div className="breed-info--results-front-img">
                                <img src={breedInfo.image.url} alt="dog images" />
                              </div>
                              <div className="breed-info--results-front-name">
                                <h3>{breedInfo.name}</h3>
                            </div>
                          </div>

                        </li>
                      </div>
                //   </Link>
                );
              })}

            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

export default MainReportsPage;
