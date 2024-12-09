import React from 'react';
import Image from 'next/image';
import { Shield, Sparkles, Timer, Send } from 'lucide-react';

const ProcessSection = () => {
  return (
    <div className="relative w-full mt-16">
      <div className="w-11/12 mx-auto h-auto py-2 relative">
        {/* Main container with gradient border */}
        <div className="relative p-[2px] rounded-lg" style={{
          background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
        }}>
          {/* Inner content container */}
          <div className="relative w-full h-full rounded-lg" style={{
            background: '#2D1A4A',
          }}>
            {/* Decorative background gradient */}
            <div 
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              style={{
                background: 'radial-gradient(circle at top left, #4A2B7A 0%, #4A2B7A 10%, rgba(74,43,122,0.8) 20%, rgba(74,43,122,0.5) 35%, rgba(74,43,122,0.2) 45%, transparent 60%)'
              }}
            />

            {/* Content container */}
            <div className="relative z-10 px-8 py-6">
              {/* First Section */}
              <div className="flex gap-8 items-center mb-16">
                {/* Image container - 30% width */}
                <div className="w-[30%] flex items-center justify-center">
                  <div className="relative w-full h-96 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[#2A235A] opacity-20 z-10" />
                    <Image
                      src="/images/proces.webp"
                      alt="Procesul de Creatie"
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                      className="z-0"
                    />
                  </div>
                </div>

                {/* Text content - 70% width */}
                <div className="w-[70%] flex flex-col justify-center relative">
                  {/* Corner decorations */}
                  <div 
                    className="absolute -top-1 -right-1 w-16 h-16"
                    style={{
                      background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, calc(100% - 2px) 100%, calc(100% - 2px) 2px, 0 2px)'
                    }}
                  />
                  <div 
                    className="absolute -bottom-1 -left-1 w-16 h-16"
                    style={{
                      background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
                      clipPath: 'polygon(0 100%, 0 0, 2px 0, 2px calc(100% - 2px), 100% calc(100% - 2px), 100% 100%)'
                    }}
                  />

                  <h2 className="text-[#FAFAFA] font-lacquer text-4xl mb-2">
                    Procesul Nostru
                  </h2>
                  <p className="text-[#FAFAFA] font-montserrat text-sm leading-relaxed mb-8">
                    Crearea unei opere de artă din cioburi de sticlă este un proces meticulos care îmbină măiestria artizanală 
                    cu măsurile stricte de siguranță. Începem prin colectarea și sortarea atentă a sticlei, urmată de procesul 
                    de șlefuire care elimină muchiile ascuțite. Folosim rășină epoxidică de înaltă calitate pentru a îmbrățișa 
                    fiecare fragment într-o îmbrățișare perfectă, creând opere de artă care sunt atât frumoase, cât și sigure 
                    pentru manipulare.
                  </p>

                  {/* Icons section */}
                  <div className="flex justify-center w-full">
                    <div className="grid grid-cols-3 gap-16 w-4/5">
                      <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 group">
                          <div 
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)'
                            }}
                          ></div>
                          <div className="relative w-full h-full rounded-full bg-[#2A235A] group-hover:bg-opacity-0 flex items-center justify-center mb-3 transition-colors duration-300">
                            <Shield className="text-[#FAFAFA] w-10 h-10" />
                          </div>
                        </div>
                        <span className="text-[#FAFAFA] text-base font-montserrat mt-3 group-hover:bg-gradient-to-r group-hover:from-[#047A6E] group-hover:via-[#047A6E] group-hover:to-[#9F1E07] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">Siguranță Maximă</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 group">
                          <div 
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)'
                            }}
                          ></div>
                          <div className="relative w-full h-full rounded-full bg-[#2A235A] group-hover:bg-opacity-0 flex items-center justify-center mb-3 transition-colors duration-300">
                            <Timer className="text-[#FAFAFA] w-10 h-10" />
                          </div>
                        </div>
                        <span className="text-[#FAFAFA] text-base font-montserrat mt-3 group-hover:bg-gradient-to-r group-hover:from-[#047A6E] group-hover:via-[#047A6E] group-hover:to-[#9F1E07] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">Proces Meticulos</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 group">
                          <div 
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)'
                            }}
                          ></div>
                          <div className="relative w-full h-full rounded-full bg-[#2A235A] group-hover:bg-opacity-0 flex items-center justify-center mb-3 transition-colors duration-300">
                            <Sparkles className="text-[#FAFAFA] w-10 h-10" />
                          </div>
                        </div>
                        <span className="text-[#FAFAFA] text-base font-montserrat mt-3 group-hover:bg-gradient-to-r group-hover:from-[#047A6E] group-hover:via-[#047A6E] group-hover:to-[#9F1E07] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">Finisaj Perfect</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-[2px] my-8" style={{
                background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
              }} />

              {/* Second Section */}
              <div className="flex gap-8 items-start">
                {/* Left side - Text content */}
                <div className="w-1/2 pr-8">
                  <h2 className="text-[#FAFAFA] font-lacquer text-4xl mb-4">
                    Comenzi Speciale
                  </h2>
                  <p className="text-[#FAFAFA] font-montserrat text-sm leading-relaxed mb-6">
                    Aveți o sticlă specială cu o valoare sentimentală deosebită? O puteți transforma într-o operă de artă unică! 
                    Trimiteți-ne sticla dumneavoastră, iar noi o vom transforma cu grijă într-o creație artistică personalizată, 
                    păstrând esența și amintirile pe care le conține.
                  </p>
                  <p className="text-[#FAFAFA] font-montserrat text-sm leading-relaxed">
                    Procesul este simplu: completați formularul alăturat cu detaliile sticlei și viziunea dumneavoastră, iar noi 
                    vă vom contacta pentru a discuta despre transformarea ei într-o piesă de artă unică. Fiecare ciob va fi tratat 
                    cu respect și atenție, iar rezultatul final va reflecta povestea specială a sticlei dumneavoastră.
                  </p>
                </div>

                {/* Right side - Form */}
                <div className="w-1/2">
                  <form className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Numele Dvs."
                        className="w-full px-4 py-2 rounded-lg bg-[#2A235A] text-[#FAFAFA] placeholder-[#FAFAFA]/50 border border-[#FAFAFA]/20 focus:border-[#047A6E] focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded-lg bg-[#2A235A] text-[#FAFAFA] placeholder-[#FAFAFA]/50 border border-[#FAFAFA]/20 focus:border-[#047A6E] focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        placeholder="Telefon"
                        className="w-full px-4 py-2 rounded-lg bg-[#2A235A] text-[#FAFAFA] placeholder-[#FAFAFA]/50 border border-[#FAFAFA]/20 focus:border-[#047A6E] focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <select 
                        className="w-full px-4 py-2 rounded-lg bg-[#2A235A] text-[#FAFAFA] border border-[#FAFAFA]/20 focus:border-[#047A6E] focus:outline-none transition-colors duration-300 mb-4"
                      >
                        <option value="" className="bg-[#2A235A]">Selectați tipul sticlei (opțional)</option>
                        
                        <optgroup label="Whiskey" className="bg-[#2A235A]">
                          <option value="jack_daniels" className="bg-[#2A235A]">Jack Daniel's</option>
                          <option value="makers_mark" className="bg-[#2A235A]">Maker's Mark</option>
                          <option value="jim_beam" className="bg-[#2A235A]">Jim Beam</option>
                          <option value="johnnie_walker_blue" className="bg-[#2A235A]">Johnnie Walker Blue Label</option>
                          <option value="johnnie_walker_black" className="bg-[#2A235A]">Johnnie Walker Black Label</option>
                          <option value="johnnie_walker_red" className="bg-[#2A235A]">Johnnie Walker Red Label</option>
                          <option value="glenfiddich" className="bg-[#2A235A]">Glenfiddich</option>
                          <option value="macallan" className="bg-[#2A235A]">Macallan</option>
                          <option value="woodford" className="bg-[#2A235A]">Woodford Reserve</option>
                          <option value="buffalo_trace" className="bg-[#2A235A]">Buffalo Trace</option>
                          <option value="jameson" className="bg-[#2A235A]">Jameson Irish Whiskey</option>
                          <option value="blantons" className="bg-[#2A235A]">Blanton's Bourbon</option>
                        </optgroup>

                        <optgroup label="Vodka" className="bg-[#2A235A]">
                          <option value="absolut" className="bg-[#2A235A]">Absolut Vodka</option>
                          <option value="ciroc" className="bg-[#2A235A]">Cîroc</option>
                          <option value="smirnoff" className="bg-[#2A235A]">Smirnoff</option>
                          <option value="stoli" className="bg-[#2A235A]">Stolichnaya (Stoli)</option>
                          <option value="ketel_one" className="bg-[#2A235A]">Ketel One</option>
                          <option value="titos" className="bg-[#2A235A]">Tito's Handmade Vodka</option>
                          <option value="crystal_head" className="bg-[#2A235A]">Crystal Head Vodka</option>
                        </optgroup>

                        <optgroup label="Gin" className="bg-[#2A235A]">
                          <option value="bombay" className="bg-[#2A235A]">Bombay Sapphire</option>
                          <option value="hendricks" className="bg-[#2A235A]">Hendrick's Gin</option>
                          <option value="tanqueray" className="bg-[#2A235A]">Tanqueray</option>
                          <option value="beefeater" className="bg-[#2A235A]">Beefeater</option>
                          <option value="roku" className="bg-[#2A235A]">Roku Gin</option>
                          <option value="monkey47" className="bg-[#2A235A]">Monkey 47</option>
                          <option value="aviation" className="bg-[#2A235A]">Aviation Gin</option>
                        </optgroup>

                        <optgroup label="Tequila" className="bg-[#2A235A]">
                          <option value="patron" className="bg-[#2A235A]">Patrón</option>
                          <option value="don_julio" className="bg-[#2A235A]">Don Julio</option>
                          <option value="clase_azul" className="bg-[#2A235A]">Clase Azul</option>
                          <option value="jose_cuervo" className="bg-[#2A235A]">Jose Cuervo</option>
                          <option value="1800" className="bg-[#2A235A]">1800 Tequila</option>
                          <option value="clase_azul_mezcal" className="bg-[#2A235A]">Clase Azul Mezcal</option>
                        </optgroup>

                        <optgroup label="Champagne" className="bg-[#2A235A]">
                          <option value="moet" className="bg-[#2A235A]">Moët & Chandon</option>
                          <option value="dom_perignon" className="bg-[#2A235A]">Dom Pérignon</option>
                          <option value="veuve_clicquot" className="bg-[#2A235A]">Veuve Clicquot</option>
                          <option value="krug" className="bg-[#2A235A]">Krug</option>
                          <option value="laurent_perrier" className="bg-[#2A235A]">Laurent-Perrier</option>
                          <option value="ace_of_spades" className="bg-[#2A235A]">Armand de Brignac (Ace of Spades)</option>
                        </optgroup>

                        <optgroup label="Rum" className="bg-[#2A235A]">
                          <option value="bacardi" className="bg-[#2A235A]">Bacardi</option>
                          <option value="captain_morgan" className="bg-[#2A235A]">Captain Morgan</option>
                          <option value="havana_club" className="bg-[#2A235A]">Havana Club</option>
                          <option value="kraken" className="bg-[#2A235A]">Kraken Black Spiced Rum</option>
                          <option value="mount_gay" className="bg-[#2A235A]">Mount Gay Rum</option>
                        </optgroup>

                        <optgroup label="Vin Premium" className="bg-[#2A235A]">
                          <option value="lafite" className="bg-[#2A235A]">Château Lafite Rothschild</option>
                          <option value="penfolds" className="bg-[#2A235A]">Penfolds Grange</option>
                          <option value="opus_one" className="bg-[#2A235A]">Opus One</option>
                          <option value="silver_oak" className="bg-[#2A235A]">Silver Oak</option>
                          <option value="mondavi" className="bg-[#2A235A]">Mondavi Reserve</option>
                        </optgroup>

                        <optgroup label="Lichioruri" className="bg-[#2A235A]">
                          <option value="baileys" className="bg-[#2A235A]">Baileys Irish Cream</option>
                          <option value="grand_marnier" className="bg-[#2A235A]">Grand Marnier</option>
                          <option value="amaretto" className="bg-[#2A235A]">Amaretto di Saronno</option>
                          <option value="chartreuse" className="bg-[#2A235A]">Chartreuse</option>
                          <option value="kahlua" className="bg-[#2A235A]">Kahlúa</option>
                          <option value="chambord" className="bg-[#2A235A]">Chambord</option>
                        </optgroup>

                        <optgroup label="Băuturi Regionale" className="bg-[#2A235A]">
                          <option value="jinro" className="bg-[#2A235A]">Jinro Soju</option>
                          <option value="chum_churum" className="bg-[#2A235A]">Chum Churum Soju</option>
                          <option value="dassai" className="bg-[#2A235A]">Dassai 23 Sake</option>
                          <option value="gekkeikan" className="bg-[#2A235A]">Gekkeikan Sake</option>
                          <option value="barsol" className="bg-[#2A235A]">Barsol Pisco</option>
                          <option value="capel" className="bg-[#2A235A]">Capel Pisco</option>
                          <option value="pernod" className="bg-[#2A235A]">Pernod Absinthe</option>
                          <option value="lucid" className="bg-[#2A235A]">Lucid Absinthe</option>
                        </optgroup>

                        <option value="other" className="bg-[#2A235A]">Altă sticlă</option>
                      </select>
                      <textarea 
                        placeholder="Descrieți viziunea dvs. pentru proiect și/sau alte sticle pe care doriți să le folosiți..."
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg bg-[#2A235A] text-[#FAFAFA] placeholder-[#FAFAFA]/50 border border-[#FAFAFA]/20 focus:border-[#047A6E] focus:outline-none transition-colors duration-300 resize-none"
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      className="w-full px-6 py-3 bg-[#9F1E07] text-[#FAFAFA] rounded-lg font-faculty hover:bg-[#FAFAFA] hover:text-[#9F1E07] transition-colors duration-300 flex items-center justify-center gap-2 group"
                    >
                      <span>Trimite Solicitarea</span>
                      <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;