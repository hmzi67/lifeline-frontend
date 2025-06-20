import AgeSelector from "@/components/questions/AgeSelector";
import GenderSelector from "@/components/questions/GenderSelector.tsx";
import LifeLineFitness from "@/components/questions/LifeLineFitness.tsx";
import {FocusAreaSelector} from "@/components/questions/FocusAreaSelector.tsx";
import PersonalizingPlans from "@/components/questions/PersonalizingPlans.tsx";
import ThankYouCard from "@/components/questions/ThankYouCard.tsx";

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
        </>
    )
}