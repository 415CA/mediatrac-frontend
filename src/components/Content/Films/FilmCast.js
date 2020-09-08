let castToRender;
if (credits.cast) {
  castToRender = credits.cast.slice(0, 5).map((actor) => {
    return (
      <Card
        key={actor.id}
        image={`${image}${actor.profile_path}`}
        header={actor.name}
        description={truncate(actor.character, 30)}
        raised={true}
      />
    );
  });
}
