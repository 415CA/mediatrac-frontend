import React from "react";
import { Card } from 'semantic-ui-react';
import { image } from '../Axios';

const Crew = ({credits}) => {
  let showCrew;
  if (credits.crew) {
    showCrew = credits.crew.slice(0, 5).map((crew) => {
      return (
        <div > 
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

  return showCrew;
}

export default Crew; 