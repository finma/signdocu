import AppLayout from "@/Layouts/AppLayout";
import { ClockLoader } from "react-spinners";

function SignLoading({loading=true}) {
    return (
        <AppLayout>
            <div className="flex flex-col justify-center gap-5 h-full md:py-10">
                <div className="flex justify-center">
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <ClockLoader
                            color="#009B4D"
                            loading={loading}
                            size={100}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        <span className="text-color-primary text-lg">
                            Signing...
                        </span>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default SignLoading;
