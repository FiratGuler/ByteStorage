function handleClick() {
        
  setCounter(counter + 1);
  setInputs([...inputs, (
    <form key={counter}>
      <input type="text"  onChange={e => seta(e.target.value)} />
      <button onSubmit={(e) => handleInputChange()}>sad</button>
    </form>
  )]);
}
function handleInputChange() {
  
  }
  const field = { [a]: '' };
  setDoc(docRef, field, { merge: true })
    .then(() => console.log(`Field "${a}" added successfully!`))
    .catch((error) => console.error(`Error adding field "${a}":`, error));
}

const handleClick = () => {
  setCounter(counter + 1);
  setInputs(inputs => [
      ...inputs,
      <div key={counter}>
          <form onSubmit={e => e.preventDefault()}>
              <input type="text" onChange={e => setCategoryName(e.target.value)} />
              <button onClick={e => handleInputChange()}>asd</button>
          </form>
      </div>
  ]); setCategoryName('');
};


<Form className='row'>
<Form.Group className="col" >
    <Form.Label>Name and Surname</Form.Label>
    <Form.Control type="text" value={nameSurname} onChange={e => setNameSurname(e.target.value)} />
<Button className='btn btn-dark' type="submit" onClick={EditSubmit} >
    Edit Confirm
</Button>
</Form>