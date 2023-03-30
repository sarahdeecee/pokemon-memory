function Results(props: any) {
  const {currentPokemon} = props;
  const {name, id, generation, imgSrc} = currentPokemon ?? '';

  return (
    <div className="Results">
      <img src={imgSrc} alt={`Illustration of ${name}`} />
    </div>
  );
}

export default Results;
