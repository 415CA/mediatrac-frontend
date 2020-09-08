let crewToRender;
if (credits.crew) {
  crewToRender = credits.crew.slice(0, 5).map((crew) => {
    return (
      <div>
        <Card
          key={crew.id + crew.job}
          image={`${image}${crew.profile_path}`}
          header={crew.name}
          description={crew.job}
          raised={false}
        />
      </div>
    );
  });
}
