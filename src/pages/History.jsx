import { useMemo } from "react";
import { historyTimeline } from "../data/historyTimeline";
import { historyChampionships } from "../data/historyChampionships";
import { historyValues } from "../data/historyValues";
import { historyTrainingSpots } from "../data/historyTrainingSpots";
import { historyCulture } from "../data/historyCulture";
import HistoryHero from "../components/History/HistoryHero";
import HistoryTimeline from "../components/History/HistoryTimeline";
import ChampionshipSection from "../components/History/ChampionshipSection";
import CultureSection from "../components/History/CultureSection";
import TrainingSpotsSection from "../components/History/TrainingSpotsSection";
import ValuesSection from "../components/History/ValuesSection";
import "./History.css";

export default function History() {
  const timeline = useMemo(() => historyTimeline, []);
  const championships = useMemo(() => historyChampionships, []);
  const values = useMemo(() => historyValues, []);
  const spots = useMemo(() => historyTrainingSpots, []);
  const culture = useMemo(() => historyCulture, []);

  return (
    <>
      <header className="background-img"></header>
      <main className="history-page">
        <section className="history-title">
          <h1>Spartan History</h1>
          <p className="subtitle">
            Michigan State Cross Country is built on generations of athletes who
            showed up, did the work, and left the program stronger than they
            found it. This page captures the story they've written together
          </p>
        </section>

        <HistoryHero />
        <HistoryTimeline items={timeline} />
        <ChampionshipSection championships={championships} />
        <CultureSection culture={culture} />
        <TrainingSpotsSection spots={spots} />
        <ValuesSection values={values} />
      </main>
    </>
  );
}