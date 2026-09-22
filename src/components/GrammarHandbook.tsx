import React, { useState } from 'react';
import { BookOpen, Check, Table, Volume2, Sparkles, Shield, Bookmark } from 'lucide-react';
import { sounds, speakGerman } from '../utils/audio';

export const GrammarHandbook: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'articles' | 'cases' | 'prepositions' | 'wordorder'>('articles');

  const handleSpeak = (text: string) => {
    speakGerman(text);
  };

  return (
    <div className="py-6 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Grammatik-Spickzettel</span>
            <BookOpen className="w-5 h-5 text-amber-400" />
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Kompakte Übersichten der wichtigsten deutschen Grammatikregeln für A1–A2.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => { sounds.playClick(); setActiveSection('articles'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeSection === 'articles' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Der, Die, Das
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveSection('cases'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeSection === 'cases' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Fälle (Akkusativ & Dativ)
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveSection('prepositions'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeSection === 'prepositions' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Präpositionen
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveSection('wordorder'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeSection === 'wordorder' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Satzbau & Weil
          </button>
        </div>
      </div>

      {/* Section 1: Articles & Gender Suffixes */}
      {activeSection === 'articles' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Der (Masculine) */}
            <div className="bg-slate-900 border border-blue-900/50 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-black text-blue-400 bg-blue-500/20 px-3 py-1 rounded-xl">
                  DER (Maskulin)
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Typische Endungen und Wortgruppen:
              </p>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center gap-1.5">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Tage & Monate:</strong> der Montag, der Juli</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Jahreszeiten:</strong> der Sommer, der Winter</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Endung -or:</strong> der Motor, der Doktor</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Endung -ling:</strong> der Frühling</span>
                </li>
              </ul>
            </div>

            {/* Die (Feminine) */}
            <div className="bg-slate-900 border border-rose-900/50 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-black text-rose-400 bg-rose-500/20 px-3 py-1 rounded-xl">
                  DIE (Feminin)
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-3">
                99% sichere Endungsregeln:
              </p>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>-ung:</strong> die Zeitung, die Übung</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>-heit / -keit:</strong> die Freiheit, Möglichkeit</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>-schaft:</strong> die Freundschaft</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>-tion:</strong> die Station, Lektion</span>
                </li>
              </ul>
            </div>

            {/* Das (Neuter) */}
            <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-black text-amber-400 bg-amber-500/20 px-3 py-1 rounded-xl">
                  DAS (Neutral)
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Typische Endungen und Verkleinerungen:
              </p>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>-chen / -lein:</strong> das Mädchen, Brötchen</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>-ment:</strong> das Dokument, Experiment</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>-um:</strong> das Zentrum, Museum</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Substantivierte Verben:</strong> das Essen, Leben</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: German Cases (Nominativ, Akkusativ, Dativ) */}
      {activeSection === 'cases' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 bg-slate-950/40">
            <h3 className="font-extrabold text-white text-base">
              Die deutsche Falltabelle (Artikel im Überblick)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Im Akkusativ ändert sich nur der Maskulinartikel (der → den). Im Dativ ändern sich alle!
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/60 text-slate-300">
                  <th className="p-3 font-bold">Fall</th>
                  <th className="p-3 font-bold text-blue-400">Maskulin (m)</th>
                  <th className="p-3 font-bold text-rose-400">Feminin (f)</th>
                  <th className="p-3 font-bold text-amber-400">Neutral (n)</th>
                  <th className="p-3 font-bold text-emerald-400">Plural (pl)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                <tr>
                  <td className="p-3 font-bold text-white bg-slate-800/20">Nominativ (Subjekt)</td>
                  <td className="p-3">der / ein</td>
                  <td className="p-3">die / eine</td>
                  <td className="p-3">das / ein</td>
                  <td className="p-3">die / keine</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white bg-slate-800/20">Akkusativ (Direktes Objekt)</td>
                  <td className="p-3 font-bold text-amber-300 bg-amber-500/10">den / einen</td>
                  <td className="p-3">die / eine</td>
                  <td className="p-3">das / ein</td>
                  <td className="p-3">die / keine</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white bg-slate-800/20">Dativ (Indirektes Objekt)</td>
                  <td className="p-3 font-bold text-amber-300 bg-amber-500/10">dem / einem</td>
                  <td className="p-3 font-bold text-amber-300 bg-amber-500/10">der / einer</td>
                  <td className="p-3 font-bold text-amber-300 bg-amber-500/10">dem / einem</td>
                  <td className="p-3 font-bold text-amber-300 bg-amber-500/10">den / keinen (+n)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Section 3: Prepositions */}
      {activeSection === 'prepositions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <span className="text-xs font-black uppercase text-amber-400 bg-amber-500/20 px-2.5 py-1 rounded-lg">
              Feste Dativ-Präpositionen
            </span>
            <h4 className="text-base font-extrabold text-white mt-2 mb-2">
              aus, bei, mit, nach, seit, von, zu
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Nach diesen Wörtern folgt <strong>IMMER</strong> der Dativ (dem, der, einem, einer).
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/60">
                <span className="text-white font-bold">mit:</span> Ich fahre <strong className="text-amber-300">mit dem</strong> Zug.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/60">
                <span className="text-white font-bold">nach:</span> <strong className="text-amber-300">Nach der</strong> Arbeit gehe ich nach Hause.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/60">
                <span className="text-white font-bold">bei:</span> Er wohnt <strong className="text-amber-300">bei seinen</strong> Eltern.
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <span className="text-xs font-black uppercase text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-lg">
              Feste Akkusativ-Präpositionen
            </span>
            <h4 className="text-base font-extrabold text-white mt-2 mb-2">
              durch, für, gegen, ohne, um
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Nach diesen Wörtern folgt <strong>IMMER</strong> der Akkusativ (den, einen).
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/60">
                <span className="text-white font-bold">für:</span> Das Geschenk ist <strong className="text-emerald-300">für den</strong> Vater.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/60">
                <span className="text-white font-bold">ohne:</span> Ein Kaffee <strong className="text-emerald-300">ohne Zucker</strong>, bitte.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/60">
                <span className="text-white font-bold">um:</span> Wir gehen <strong className="text-emerald-300">um die</strong> Ecke.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Word Order & Conjunctions */}
      {activeSection === 'wordorder' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div>
            <h3 className="text-lg font-extrabold text-white">
              Die 2 goldenen Regeln des deutschen Satzbaus
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Verstehe Verb-Position 2 und das Verb-Ende in Nebensätzen.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700">
            <div className="text-xs font-bold text-amber-400 uppercase mb-1">
              Regel 1: Hauptsatz (Verb immer an Position 2)
            </div>
            <p className="text-xs text-slate-300 mb-2">
              Egal welches Element am Anfang steht (Subjekt oder Zeitangabe), das konjugierte Verb steht an Position 2:
            </p>
            <div className="font-mono text-xs text-emerald-300 bg-slate-950 p-2.5 rounded-lg">
              1. Heute [Zeit] → 2. <strong>lerne</strong> [Verb] → 3. ich [Subjekt] → 4. Deutsch.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700">
            <div className="text-xs font-bold text-amber-400 uppercase mb-1">
              Regel 2: Nebensatz mit "weil", "dass", "obwohl" (Verb an das Satzende)
            </div>
            <p className="text-xs text-slate-300 mb-2">
              Subordinierende Konjunktionen kicken das konjugierte Verb an die allerletzte Stelle des Nebensatzes:
            </p>
            <div className="font-mono text-xs text-amber-300 bg-slate-950 p-2.5 rounded-lg">
              Ich lerne Deutsch, weil es Spaß <strong>macht</strong>.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
