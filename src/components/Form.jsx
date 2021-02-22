import { useState } from "react";

const months = {
  1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H",
  7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T"
}

const encode = (data) => {
  const surname = encodeSurname(data.surname);
  const name = encodeName(data.name);
  const date = encodeBirthdate(data.birthdate, data.gender);
  const code = [surname, name, date].join("");
  return code;
};

const encodeBirthdate = (date, gender) => {
  const [day, month, year] = date.split("/");
  const yearDigits = year.slice(year.length - 2);
  const monthLetter = months[parseInt(month)];
  let dayDigits = day;
  if (gender === "M" && day < 10) {
    dayDigits = "0" + parseInt(dayDigits);
  }
  if (gender === "F") {
    dayDigits = parseInt(dayDigits) + 40;
  }
  return [yearDigits, monthLetter, dayDigits].join("");
};

const encodeName = (name) => {
  name = name.toUpperCase().split("");
  const [consonants, vowels] = letters(name);
  const res = [];
  if (consonants.length > 3) {
    res.push(consonants[0]);
    res.push(consonants[2]);
    res.push(consonants[3]);
  }
  res.push(...consonants.slice(0, 3));
  if (res.length < 3) {
    res.push(...vowels.slice(0, 3 - res.length));
  }
  let x = 3 - res.length;
  for (let i = 0; i < x; i++) {
    res.push("X");
  }
  return res.join("");
};

const encodeSurname = (surname) => {
  surname = surname.toUpperCase().split("");
  const [consonants, vowels] = letters(surname);
  const res = [];
  res.push(...consonants.slice(0, 3));
  if (res.length < 3) {
    res.push(...vowels.slice(0, 3 - res.length));
  }
  let x = 3 - res.length;
  for (let i = 0; i < x; i++) {
    res.push("X");
  }
  return res.join("");
};

const letters = (word) => {
  const consonants = [];
  const vowels = [];
  for (let c of word) {
    if (!"AEIOU".split("").includes(c)) {
      consonants.push(c);
      continue;
    }
    vowels.push(c);
  }
  return [consonants, vowels];
}

const onSubmit = (data, setCode) => {
  setCode(encode(data));
};

function Form() {
  const [fields, setFields] = useState({
    birthdate: "",
    gender: "M",
    name: "",
    surname: "",
  });

  const [code, setCode] = useState(Array(10).fill("X").join(""));

  return (
    <div>
      <form action="#" onSubmit={() => onSubmit(fields, setCode)}>
        <input
          onChange={e => setFields({ ...fields, name: e.target.value })}
          placeholder="Name"
          type="text"
          value={fields.name}
        />
        <br />
        <input
          onChange={e => setFields({ ...fields, surname: e.target.value })}
          placeholder="Surname"
          type="text"
          value={fields.surname}
        />
        <br />
        Gender:
        <select
          onChange={e => setFields({ ...fields, gender: e.target.value })}
          value={fields.gender}
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <br />
        <input
          onChange={e => setFields({ ...fields, birthdate: e.target.value })}
          placeholder="Birthdate"
          type="text"
          value={fields.birthdate}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      Your tax code is: {code}
    </div>
  );
}

export default Form;