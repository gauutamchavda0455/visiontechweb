import Carousel from '../components/Carousel'

export default function Home() {
  const jpgs = import.meta.glob('../images/image*.jpg', { eager: true, as: 'url' }) as Record<string, string>
  const svgs = import.meta.glob('../images/slide*.svg', { eager: true, as: 'url' }) as Record<string, string>
  const images = [1, 2, 3, 4, 5]
    .map((n) => jpgs[`../images/image${n}.jpg`] ?? svgs[`../images/slide${n}.svg`])
    .filter(Boolean) as string[]
  return (
    <section>
      <div className="full-bleed">
        <Carousel
          images={images}
          intervalMs={5000}
          height={500}
          showControls
          showIndicators
          renderOverlay={(active) => {
            if (active === 0) {
              return (
                <div className="hero">
                  <h1 className="headline">Big Challenges. <br />Bigger Opportunities.</h1>
                  <p className="subhead">
                    We move with you through your digital transformation journey.
                  </p>
                  <div className="actions">
                    <a className="btn btn-primary" href="/services">More...</a>
                    <a className="btn btn-outline" href="/about">More...</a>
                  </div>
                </div>
              )
            }
            if (active === 1) {
              return (
                <div className="hero">
                  <h1 className="headline">Are You Future-Ready?</h1>
                  <p className="subhead">
                    We make it possible with Cybage’s technology consulting services.
                  </p>
                  <div className="actions">
                    <a className="btn btn-primary" href="/services">More...</a>
                    <a className="btn btn-outline" href="/about">More...</a>
                  </div>
                </div>
              )
            }
            if (active === 2) {
              return (
                <div className="hero">
                  <h1 className="headline">Elevated Expertise, Endless Possibilities</h1>
                  <p className="subhead">
                    Proud to be an AWS Advanced Tier Partner, delivering cutting-edge cloud solutions.
                  </p>
                  <div className="actions">
                    <a className="btn btn-primary" href="/services">More...</a>
                    <a className="btn btn-outline" href="/about">More...</a>
                  </div>
                </div>
              )
            }
            if (active === 3) {
              return (
                <div className="hero">
                  <h1 className="headline">Innovate Better, Move Faster</h1>
                  <p className="subhead">
                    Unlock the secrets of product engineering with Cybage.
                  </p>
                  <div className="actions">
                    <a className="btn btn-primary" href="/services">More...</a>
                    <a className="btn btn-outline" href="/about">More...</a>
                  </div>
                </div>
              )
            }
            if (active === 4) {
              return (
                <div className="hero">
                  <h1 className="headline">Tech That Moves You</h1>
                  <p className="subhead">
                    We've Got IT Under Control<br />
                    Your Tech, Our Passion<br />
                    Where Ideas Take Flight.
                  </p>
                  <div className="actions">
                    <a className="btn btn-primary" href="/services">More...</a>
                    <a className="btn btn-outline" href="/about">More...</a>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
      </div>
    </section>
  )
}
