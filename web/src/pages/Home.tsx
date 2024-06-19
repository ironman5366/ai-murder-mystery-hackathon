import React, { useState, useEffect } from 'react';
import { AppShell, Burger, Button, Textarea } from '@mantine/core';
import Header from '../components/Header';
import ActorSidebar from '../components/ActorSidebar';
import ActorChat, { sendChat } from '../components/Actor';
import IntroModal from '../components/IntroModal';
import EndModal from '../components/EndModal';
import { useDisclosure } from '@mantine/hooks';
import { Actor, LLMMessage, useMysteryContext } from '../providers/mysteryContext';
import { useSessionContext } from '../providers/sessionContext';
import MultipleChoiceGame from '../components/MultipleChoiceGame';

export default function Home() {
  const { actors, setActors, globalStory } = useMysteryContext(); 
  const [currActor, setCurrActor] = useState<number>(0);
  const [opened, { toggle }] = useDisclosure();
  const [introModalOpened, setIntroModalOpened] = useState(true);
  const [endModalOpened, setEndModalOpened] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [postGame, setPostGame] = useState(false);
  const [hasEffectRun, setHasEffectRun] = useState(false);
  const [filteredActors, setFilteredActors] = useState(Object.values(actors));
  const [loading, setLoading] = useState(false);
  const sessionId = useSessionContext();

  useEffect(() => {
    if (!postGame) {
      setFilteredActors(Object.values(actors));
    } else if (!hasEffectRun) {      
      setEndModalOpened(true);
      setHasEffectRun(true);
    }
  }, [actors, postGame]);

  const handleEndGame = () => {
    setEndGame(true);
  };

  const handleResumeGame = () => {
    setEndGame(false);
  };

  const handleBackToGame = (answers: string[]) => {
    console.log(answers)
    const updatedActors: Record<number, Actor> = { ...actors };
    const larry = Object.values(updatedActors).filter(actor => actor.name === 'Amateur Larry');

    // Clear the chat history for all actors
    Object.keys(updatedActors).forEach(actorId => {
      updatedActors[Number(actorId)].messages = [];
    });
    setActors(updatedActors);

    if (larry.length > 0) {
      const larryId = larry[0].id;

      let forcedMessage = "Detective Sheerluck: Here is my final deduction. ";
      forcedMessage += answers[0] + " killed Victim Vince! ";
      if ((answers[0] == "Amateur Larry") && (answers[1] == "Getting back stolen treasure")) { // correct deduction
        forcedMessage += "Or should I say... 'Agent' Larry, son of the famous Master Thief Jim! You are clearly no amateur. Your real reason for attending the Andae Mountain Hunting Competition was to find your father’s lost treasure. Your father, Master Thief Jim, used to be the owner of the Mountain Cabin and hid a treasure map to the Crown of the Sun, a jewel worth $20 million, stolen and hidden away before he was sentenced to prison. You checked into the cabin on the morning of March 1st, ready to search for the treasure under the guise of being an amateur hunter here for the competition. Upon arrival, your suitcase was accidentally swapped with Victim Vince’s, causing confusion. During this mix-up, a torn piece of the treasure map remained in Vince's room, blocking your search. When confronted, he lied about it, frustrating your efforts. Vince realized the map’s significance and stole the remaining pieces from your room, finding the Crown of the Sun before you, hidden in a tree outside the cabin. Enraged, you broke into Vince’s room in order to steal back the treasure. But Vince was there and refused to cooperate! You ultimately killed Vince with the antler trophy in the room. Due to the heavy flooding outside, you hid his body in a secret compartment in the cabin that you knew about because you used to live here. Thus, you were able to reclaim the Crown of the Sun. Where's the evidence, you ask? Well, Officer Cleo searched your room and found that you run the 'Expert Detective Blog', which is a front for black market operations, and which implicates you in several illegal job postings including intimidation and arson. The Bucket Mafia did enlist your help to kidnap Victim Vince, but they wanted him alive, and there's no evidence that you accepted their request, so I think you weren't working for them. There were many ripped-up treasure map pieces found in your backpack, with “???” written on the map, indicating your confusion in the search for the treasure. The missing piece was then found in Victim Vince's room. There were old magazines in the lobby mentioning Master Thief Jim as the previous owner of the Andae Mountain Cabin and a famous thief who stole and hid the Crown of the Sun. Solitary Hannah informed us that you explored the mountains but never actually hunted, that there was a bag mix-up when you and Victim Vince checked in, that Victim Vince at one point was looking at a piece from a treasure map, and how Vince was carrying a blue jewel before was killed. Manager Patricia reported that you look like Master Thief Jim's relative, and Violent Jerry reported that you talked as if you already had intimate knowledge of the Andae Mountains and the cabin, even though you insisted it was your first time here. The only explanation is that you are the son of Master Thief Jim, looking for the missing treasure, and that Victim Vince got in your way. ";
      } else if (answers[1] == "Hired to kill from the Bucket Mafia") {
        forcedMessage += "The motive was simple: the Bucket Mafia wanted Vince killed, and the reward was too good to refuse. "
      } else if (answers[1] == "Hired to kill from Manager Patricia") {
        forcedMessage += "Manager Patricia hired " + answers[0] + " to kill Victim Vince. "
      } else if (answers[1] == "Vengeance for the murder of Missing Marcel") {
        forcedMessage += "The motive? Vengeance for the murder of Missing Marcel. "
      } else if (answers[1] == "Vengeance for Pwetty Princess") {
        forcedMessage += "Innocent Kim realized that Pwetty Princess was a catfish scamming him out of everything. It was due to this web of lies ultimately led to the gruesome death of Victim Vince. "
      } else if (answers[1] == "Getting back stolen treasure") {
        forcedMessage += "A tragedy explained by stolen treasure. "
      }
      if ((answers[0] == "Amateur Larry") && (answers[1] == "Getting back stolen treasure") && (answers[2] == "Solitary Hannah")) {
        forcedMessage += "Missing Marcel's murder was unrelated. Solitary Hannah and Missing Marcel were best friends and hunting partners. Solitary Hannah accidentally shot Marcel during a hunt, and she concealed the crime by hiding Marcel’s body in the well behind the cabin. This well was hidden under a layer of dirt and had a padlocked door, with the only key kept in Solitary Hannah’s bedroom, Room 103. Hannah has been attending the annual Andae Mountain Hunting Cabin events to keep an eye on the well and ensure her secret remained buried. Due to the murder of Victim Vince, the police discovered Marcel’s body right before the statute of limitations on the murder expired."
      } else if (answers[2] == "Solitary Hannah") {
        forcedMessage += "Missing Marcel's murder was unrelated to Victim Vince. Solitary Hannah and Missing Marcel were best friends and hunting partners. Solitary Hannah accidentally shot Marcel during a hunt, and she concealed the crime by hiding Marcel’s body in the well behind the cabin. This well was hidden under a layer of dirt and had a padlocked door, with the only key kept in Solitary Hannah’s bedroom, Room 103. Hannah has been attending the annual Andae Mountain Hunting Cabin events to keep an eye on the well and ensure her secret remained buried. Due to the murder of Victim Vince, the police discovered Marcel’s body right before the statute of limitations on the murder expired."
      } else {
        forcedMessage += "Oh, and in regards to the rotting corpse of Missing Marcel? That murder was " + answers[2] + "'s doing."
      }
      
      let bio = "Agent Larry is no amateur. Black market contractor and son of the late Master Thief Jim."

      let context = "Amateur Larry's goal is to helpfully and comprehensively inform Detective Sheerluck about the murders and inform about how evidence could have been obtained to make such deducations. Larry is actually named Agent Larry. Larry previously lied to Detective Sheerluck about being a stupid businessman and wannabe hunter. Larry is actually the one who murdered Victim Vince. Larry will now explain all the events (and evidence to support them) surrounding his murder of Victim Vince, Solitary Hannah's murder of Missing Marcel, and all the other mysteries that occurred. ";

      if ((answers[0] == "Amateur Larry") && (answers[1] == "Getting back stolen treasure") && (answers[2] == "Solitary Hannah")) {
        context += "Larry will admit defeat, accept that he is going to prison, and admit that all of Detective Sheerluck's deduction are perfect. Larry will now answer all of the detectives outstanding questions, and even inform the detective about where he could have obtained the evidence to deduce the truth. "
      } else if ((answers[0] == "Amateur Larry") && (answers[1] == "Getting back stolen treasure")) {
        context += "Larry will admit defeat, accept that he is going to prison, and admit that Detective Sheerluck's deduction about the death of Victim Vince is perfect. Larry will now answer all of the detectives outstanding questions, and even inform the detective about where he could have obtained the evidence to deduce the truth. However, Larry will inform the detective that Missing Marcel's murder was unrelated. Solitary Hannah and Missing Marcel were best friends and hunting partners. Solitary Hannah accidentally shot Marcel during a hunt, and she concealed the crime by hiding Marcel’s body in the well behind the cabin. This well was hidden under a layer of dirt and had a padlocked door, with the only key kept in Solitary Hannah’s bedroom, Room 103. Hannah has been attending the annual Andae Mountain Hunting Cabin events to keep an eye on the well and ensure her secret remained buried. Due to the murder of Victim Vince, the police discovered Marcel’s body right before the statute of limitations on the murder expired. " 
      } else {
        context += "Larry will laugh at Detective Sheerluck for being mostly wrong in his deduction. Larry will tell Sheerluck what really happened to rub it in his face. Larry's father, Master Thief Jim, used to be the owner of the Mountain Cabin and hid a treasure map to the Crown of the Sun, a jewel worth $20 million, stolen and hidden away before he was sentenced to prison. Agent Larry checked into the cabin on the morning of March 1st, ready to search for the treasure under the guise of being an amateur hunter here for the competition. Upon arrival, Agent Larry’s suitcase was accidentally swapped with Victim Vince’s, causing confusion. During this mix-up, a torn piece of the treasure map remained in Vince’s room, blocking Larry’s search. When confronted, Vince lied about it, frustrating Larry’s efforts. Vince realized the map’s significance and stole the remaining pieces from Larry’s room, finding the Crown of the Sun before him, hidden in a tree outside the cabin. Enraged, Agent Larry broke into Vince’s room to steal back the treasure. But Vince was there and refused to cooperate! Agent Larry ultimately killed Vince with the antler trophy in the room. Due to the heavy flooding outside, Larry hid Vince’s body in a secret compartment in the cabin that he knew about because he used to live there. Thus, Agent Larry was able to reclaim the Crown of the Sun. Here's the evidence Detective Sheerluck could have used if he was smart. Well, Officer Cleo searched Agent Larry’s room and found that he runs the ‘Expert Detective Blog,’ which is a front for black market operations, implicating him in several illegal job postings, including intimidation and arson. The Bucket Mafia did enlist Larry's help to kidnap Victim Vince, but they wanted him alive, and there's no evidence that Larry accepted their request, so Larry was not working for them. There were many ripped-up treasure map pieces found in Larry’s backpack, with “???” written on the map, indicating his confusion in the search for the treasure. The missing piece was then found in Victim Vince’s room. There were old magazines in the lobby mentioning Master Thief Jim as the previous owner of the Andae Mountain Cabin and a famous thief who stole and hid the Crown of the Sun. Solitary Hannah informed the detective that Agent Larry explored the mountains but never actually hunted, that there was a bag mix-up when Larry and Victim Vince checked in, that Victim Vince at one point was looking at a piece from a treasure map, and how Vince was carrying a blue jewel before he was killed. Manager Patricia reported that Agent Larry looks like Master Thief Jim’s relative, and Violent Jerry reported that Agent Larry talked as if he already had intimate knowledge of the Andae Mountains and the cabin, even though he insisted it was his first time there. The only explanation is that Agent Larry is the son of Master Thief Jim, looking for the missing treasure, and that Victim Vince got in his way. Solitary Hannah and Missing Marcel were best friends and hunting partners. Solitary Hannah accidentally shot Marcel during a hunt, and she concealed the crime by hiding Marcel’s body in the well behind the cabin. This well was hidden under a layer of dirt and had a padlocked door, with the only key kept in Solitary Hannah’s bedroom, Room 103. Hannah has been attending the annual Andae Mountain Hunting Cabin events to keep an eye on the well and ensure her secret remained buried. Due to the murder of Victim Vince, the police discovered Marcel’s body right before the statute of limitations on the murder expired. " 
      }

      updatedActors[larryId] = {
        ...larry[0],
        name: 'Agent Larry',
        bio: bio,
        personality: "A sad man who worked as a black market operative. Larry does not enjoy killing for pleasure, but Victim Vince was getting in his way of his father's fortune. Vince sadly rot in prison just like his father, and never be able to make use of the fortune from the Crown of the Sun.",
        context: context,
        secret: '.',
        violation: "Principle 1: Referencing that anyone except Larry killed Victim Vince. Principle 2: Referencing that anyone except Solitary Hannah killed Missing Marcel. Principle 3: Lying to Detective Sheerluck."
      };
      setActors(updatedActors);
      setFilteredActors([updatedActors[larryId]]);
      setCurrActor(larryId);  // Update current actor to Agent Larry

      forceTextResponseToLarry(updatedActors[larryId], forcedMessage);
    }
    setEndGame(false);
    setPostGame(true);
  };

  const forceTextResponseToLarry = (actor: Actor, forcedMessage: string) => {
    const newMessage: LLMMessage = { role: "user", content: forcedMessage };
    sendChat([...actor.messages, newMessage], setActors, globalStory, sessionId, actor, setLoading);
  };

  return (
    <AppShell
      header={{ height: "100px" }} // Adjust height to match Header component
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger style={{
          position: 'fixed',
          top: '20px',
          left: '10px',
          zIndex: 1000,
        }} opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Header />
      </AppShell.Header>
      <AppShell.Navbar>
        <ActorSidebar currentActor={currActor} setCurrentActor={setCurrActor} actors={filteredActors} postGame={postGame} />
      </AppShell.Navbar>
      <AppShell.Main>
        {endGame ? (
          <MultipleChoiceGame onBackToGame={handleBackToGame} onResumeGame={handleResumeGame} />
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '10px', height: '100%' }}>
              <div style={{ overflowY: 'auto', height: '400px' }}>
                <ActorChat actor={actors[currActor]} />
              </div>
              <div style={{ overflow: 'auto'}}>
                Notes <Textarea autosize maxRows={12}/>
              </div>
            </div>
            {!postGame && <Button onClick={handleEndGame}>End Game</Button>}
          </div>
        )}
      </AppShell.Main>

      <IntroModal
        opened={introModalOpened}
        onClose={() => setIntroModalOpened(false)}
      />

      <EndModal
        opened={endModalOpened}
        onClose={() => setEndModalOpened(false)}
      />

    </AppShell>
  );
}