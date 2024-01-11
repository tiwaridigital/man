import React, { useState } from 'react';

const SearchSelect = ({ options, filterMethod, render }) => {
  const [results, setResults] = useState(options);

  const searchList = (event) => {
    const updatedResults = filterMethod(options, event.target.value);
    setResults(updatedResults);
  };

  return render({
    results,
    searchList,
  });
};

const options = [
  'Inside Out',
  'John Wick',
  'Jurassic World',
  'The Lord of the Rings',
  'Pacific Rim',
  'Pirates of the Caribbean',
  'Planet of the Apes',
  'Saw',
  'Sicario',
  'Zombies',
];

const Autocomplete = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const filterMethod = (options, query) => {
    return options.filter((option) =>
      option.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const showDropdown = () => {
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  console.log('selected', selected);

  return (
    <SearchSelect
      options={options}
      filterMethod={filterMethod}
      render={({ results, searchList }) => (
        <div className="autocomplete">
          <input
            type="text"
            value={`${selected ? selected : 'Type to search list'}`}
            placeholder={`${selected ? selected : 'Type to search list'}`}
            onChange={searchList}
            onFocus={showDropdown}
            readOnly={true}
            // onBlur={hideDropdown}
          />
          {dropdownVisible && (
            <div className="autocomplete-dropdown">
              <ul className="autocomplete-search-results-list">
                {results.map((result) => (
                  <li
                    className="autocomplete-search-result"
                    key={result}
                    onClick={() => {
                      setSelected(result);
                      hideDropdown();
                    }}
                  >
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    />
  );
};

const TagListSearch = () => {
  const filterMethod = (options, query) => {
    return options.filter((option) =>
      option.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return (
    <SearchSelect
      options={options}
      filterMethod={filterMethod}
      render={({ results, searchList }) => (
        <div className="tag-list-search">
          <input
            type="text"
            placeholder="Type to search list"
            onChange={searchList}
          />
          <ul className="tag-list">
            {results.map((result) => (
              <li className="tag" key={result}>
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
};

const App = () => {
  return (
    <div className="wrapper">
      <div className="example">
        <h2>Autocomplete</h2>
        <Autocomplete />
      </div>
      <div className="example">
        <h2>Tag List Search</h2>
        <TagListSearch />
      </div>
    </div>
  );
};

export default App;
