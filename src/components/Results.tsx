function Results(props: any) {
  const {currentPokemon} = props;
  const {name, id, generation, imgSrc} = currentPokemon ?? '';

  return (
    <div>
      <img src={imgSrc} alt={`Illustration of ${name}`} className="Results" />
    </div>
  );
}

export default Results;
