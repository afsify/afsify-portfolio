import Image from "next/image";
import { recognition } from "@/data/recognition";
import { Container, SectionHeading, TextLink } from "@/components/ui/primitives";
import { recognitionImageSizes } from "@/lib/image-sizes";

export function Recognition({ preview = false }: { preview?: boolean }) {
  return <section className="section recognition-section" aria-labelledby="recognition-title"><Container><div id="recognition-title"><SectionHeading label="Recognition & milestones" title="The people. The progress." number={preview ? "03" : undefined}>{preview && <TextLink href="/experience">The full journey</TextLink>}</SectionHeading></div><div className="recognition-grid">{recognition.map((item) => <figure key={item.title}><div className="recognition-image"><Image src={item.image} alt={item.alt} fill quality={90} sizes={recognitionImageSizes(item.image)} style={{ objectPosition: item.position }} /></div><figcaption><p className="eyebrow">{item.category}</p><h3>{item.title}</h3><p>{item.description}</p></figcaption></figure>)}</div></Container></section>;
}
