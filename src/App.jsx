import { useState, useEffect} from 'react'
import PokemonCard from './components/pokemoncard';
import './App.css'

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [selectedWeakness, setSelectedWeakness] = useState(" ");
  const [weaknessOptions, setWeaknessOptions] = useState([]);
  const [selectedType, setSelectedType] = useState(" ");
  const [typeOptions, setTypeOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(" ");

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
    .then((response) => response.json())
    .then((data) => {
    console.log("Fetched data:", data);
    setPokemonList(data.pokemon);

    //Extract unique WEAKNESSES from the dataset
    const allWeaknesses = data.pokemon.reduce(
      (acc, pokemon) => acc.concat(pokemon.weaknesses),
      []);

    //Extract unique TYPES from the dataset
    const allTypes = data.pokemon.reduce(
      (acc, pokemon) => acc.concat(pokemon.type),[]);

    //Remove duplicates and create an array of unique WEAKNESSES
    const uniqueWeaknesses = [...new Set(allWeaknesses)];

    //Remove duplicates and create an array of unique TYPES
    const uniqueTypes = [...new Set(allTypes)];

    //Update the WEAKNESSES and TYPES dropdown options
    setWeaknessOptions(uniqueWeaknesses);
    setTypeOptions(uniqueTypes);
    setFilteredPokemonList(data.pokemon);
    })/* end of the 2nd .then callback*/
   
    .catch((error) => console.error("Error fetching data:", error));
  },[]);

  const handleWeaknessChange = (event) => {
    const weakness = event.target.value.toLowerCase().trim();
    console.log("Selected Weakness:", weakness);
    setSelectedWeakness(weakness);
    updateFilteredPokemonList(selectedType, weakness, searchTerm);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value.toLowerCase().trim();
    console.log("Selected Type:", type);
    setSelectedType(type);
    updateFilteredPokemonList(type, selectedWeakness, searchTerm);
  };

  const handleNameChange = (event) => {
    const name = event.target.value.toLowerCase().trim();
    setSearchTerm(name);
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();
    updateFilteredPokemonList(selectedType, selectedWeakness, searchTerm);
  };

  const updateFilteredPokemonList = (type, weakness, name) => {
    const lowercaseType = type.toLowerCase().trim();
    const lowercaseWeakness = weakness.toLowerCase().trim();
    const lowercaseName = name.toLowerCase().trim();

    const filteredList = pokemonList.filter((pokemon) => {
      const matchesType = lowercaseType === "" || pokemon.type.some((t) => t.toLowerCase().trim() === lowercaseType);
      const matchesWeakness =
        lowercaseWeakness === "" || pokemon.weaknesses.some((w) => w.toLowerCase().trim() === lowercaseWeakness);
      const matchesName = lowercaseName === "" || pokemon.name.toLowerCase().includes(lowercaseName);

      return matchesType && matchesWeakness && matchesName;
    });

    setFilteredPokemonList(filteredList);
  };

  
  return (
  <>
   <div className="appcontain">
      <div className="backcolor">
        <h1>Pokemon</h1>
                          {/*name filter search section */}
        <form className="namefiltercontain" onSubmit={handleNameSubmit}>
          <label htmlFor="nameFilter">Search by Name:</label>
            <input type="text"id="nameFilter"placeholder="Enter Pokemon name"
              value={searchTerm} onChange={handleNameChange}/>
              <button type="submit" id="submitName">Submit</button>
        </form>

        <div className="filterscontain">     
                        {/*type filter section */}
          <div className="typefiltercontain">
           <label htmlFor="typeFilter">Filter by Type:</label>
              <select id="typeFilter" value={selectedType} onChange={handleTypeChange}>
                <option value="">All Types</option>
                {typeOptions.map((type, index) => (
                <option key={type + index} value={type.toLowerCase()}>
                    {type.toLowerCase()}
                </option>
                ))}
              </select>
          </div>{/*typefiltercontain*/}

                       {/*weaknesses filter section */}
        <div className="weaknessesfiltercontain">
          <form>
            <label htmlFor="weaknessFilter">Filter by Weakness:</label>
            <select name="weaknessFilter" id="weaknessFilter" value={selectedWeakness}
              onChange={handleWeaknessChange}>         
              <option value="">All Weaknesses</option>
                {weaknessOptions.map((weakness, index) => {
                  return(
                    <option key={weakness+index} value={weakness.toLowerCase()}>
                      {weakness.toLowerCase()}
                    </option>
                    );              
                 })}
              </select>
          </form>
        </div>{/*weaknessesfiltercontain*/}
        </div>{/*filterscontain*/}
    </div>{/*backcolor*/}
    <PokemonCard key={filteredPokemonList.length} pokemonList={filteredPokemonList} />
   </div>{/*appcontain*/}
    </>
  )
}
export default App
