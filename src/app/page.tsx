import { CinematicEntrance } from '@/components/hero/cinematic-entrance';
import { Positioning, SkillsShowcase } from '@/components/identity';
import { JourneyStages } from '@/components/learning-journey';
import { ProjectCards } from '@/components/projects';
import { ContactHub } from '@/components/contact';

/**
 * Alishba Immersive AI Portfolio - Homepage
 * User Story 1: Cinematic Virtual World Entrance
 * User Story 2: Identity & Skills Presentation
 * User Story 3: Learning Journey
 * User Story 4: Projects Showcase
 * User Story 5: Professional Contact Hub
 */

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#02040a] text-neutral-100 selection:bg-cyan-500/25 selection:text-white">
      {/* Hero Section: Cinematic Virtual World Entrance (User Story 1) */}
      <CinematicEntrance />

      {/* Identity & Positioning Section (User Story 2) */}
      <Positioning />

      {/* Skills Showcase Section (User Story 2) */}
      <SkillsShowcase />

      {/* Learning Journey Section (User Story 3) */}
      <JourneyStages />

      {/* Projects Showcase Section (User Story 4) */}
      <ProjectCards />

      {/* Professional Contact Hub (User Story 5) */}
      <ContactHub />
    </div>
  );
}
