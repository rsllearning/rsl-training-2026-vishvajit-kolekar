import Badge from "./components/Badge";
import Button from "./components/Button";
import Card from "./components/Card";
import { row, section } from "./styles/components.css";
import { main, heading, subtitle } from "./styles/page.css";

export default function App() {
  return (
    <main className={main}>
      <h1 className={heading}>Component library</h1>

      <section className={section} aria-label="Component examples">
        <Card>
          <h2 className={subtitle}>Buttons</h2>
          <div className={row}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className={row}>
            <Button size="small">Small</Button>
            <Button size="large">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Card>

        <Card>
          <h2 className={subtitle}>Badges</h2>
          <div className={row}>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </Card>

        <Card>
          <h2 className={subtitle}>Card</h2>
          <p>A reusable card with shared spacing, background, radius, and shadow.</p>
        </Card>
      </section>
    </main>
  );
}
