import React from 'react'
import {ChallengeProvider} from "../../challenge/ChallengeContext";
import ChallengeSwitcher from "../../challenge/ChallengeSwitcher";

function ChallengeList() {
  return (

    <ChallengeProvider>
      <ChallengeSwitcher/>
    </ChallengeProvider>
  )
}

export default ChallengeList