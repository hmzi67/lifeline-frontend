import AgeSelector from "@/components/questions/AgeSelector";
import GenderSelector from "@/components/questions/GenderSelector.tsx";
import LifeLineFitness from "@/components/questions/LifeLineFitness.tsx";
import {FocusAreaSelector} from "@/components/questions/FocusAreaSelector.tsx";
import PersonalizingPlans from "@/components/questions/PersonalizingPlans.tsx";
import ThankYouCard from "@/components/questions/ThankYouCard.tsx";
import { FitnessGraph } from "@/components/questions/fitnessgraph";
import HeightSelector from "@/components/questions/HeightSelector";
import FitnessMotivationSelector from "../../components/questions/FitnessMotivation";
import DietTypeSelector from "@/components/questions/dietTypes";
import FitnessLevelSelector from "@/components/questions/FitnessLevelSelector";
import FitnessGoalSelector from "@/components/questions/FitnessGoalSelector";
import AllergenSelector from "@/components/questions/AllergenSelector";
import TypicalDaySelector from "@/components/questions/TypicalDaySelector";

export default function Questions() {
    return (
        <>
            <GenderSelector />
            <AgeSelector />
            // For women
            <LifeLineFitness
                gender="women"
                onContinue={() => console.log('Continue clicked')}
            />

            // For men
            <LifeLineFitness
                gender="men"
                onContinue={() => console.log('Continue clicked')}
            />

            // female
            <FocusAreaSelector
                gender="female"
                onSelectionChange={(areas) => console.log(areas)}
                onContinue={(areas) => console.log(areas)}
            />

            // male
            <FocusAreaSelector
                gender="male"
                onSelectionChange={(areas) => console.log(areas)}
                onContinue={(areas) => console.log(areas)}
            />

            <PersonalizingPlans />
            <ThankYouCard />
            <FitnessGraph gender={"female"} />
            <FitnessGraph gender={"male"} />
            <HeightSelector/>
            <FitnessMotivationSelector/>
            <FitnessGoalSelector/>
            <DietTypeSelector/>
            <FitnessLevelSelector/>
            <AllergenSelector/>
            <TypicalDaySelector/>
             
        </>
    )
}