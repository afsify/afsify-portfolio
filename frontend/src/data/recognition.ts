export interface Recognition {
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  position: string;
}
export const recognition: readonly Recognition[] = [
  { title: "A delivery worth remembering.", category: "Le’Valor · Project recognition", description: "Recognition connected to the completion of Le’Valor hospitality and property-management software, as part of the delivery team.", image: "/images/experience/levalor-delivery.webp", alt: "Muhammed Afsal receiving recognition with the Le’Valor software delivery team", position: "center 48%" },
  { title: "One year at Bizforz.", category: "Work anniversary", description: "A work anniversary recognition marking a year of contributing, collaborating and learning in production.", image: "/images/experience/bizforz-anniversary.webp", alt: "Muhammed Afsal receiving his one-year Bizforz work anniversary memento from his manager", position: "center 43%" },
  { title: "From learning to building.", category: "Brototype · Graduation", description: "A milestone in the journey from project-based MERN training to professional software development.", image: "/images/experience/brototype-graduation.webp", alt: "Muhammed Afsal receiving his Brototype graduation memento", position: "center 48%" },
];
