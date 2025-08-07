import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Edit} from "lucide-react";

export function EditProfile({user}) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button><Edit className={'w-5 h-5'} />Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        {/* Name */}
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" defaultValue={user.firstName + ' ' + user.lastName} />
                        </div>

                        {/* Username */}
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Username</Label>
                            <Input id="username-1" name="username" defaultValue="@peduarte" />
                        </div>

                        {/* Reset Password */}
                        <div className="grid gap-3">
                            <Label htmlFor="password">Reset Password</Label>
                            <Input id="password" name="password" type="password" placeholder="Enter new password" />
                        </div>

                        {/* Date of Birth */}
                        <div className="grid gap-3">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" name="dob" type="date" defaultValue={new Date(user.dateOfBirth).toISOString().split("T")[0]} />
                        </div>

                        {/* Gender */}
                        <div className="grid gap-3">
                            <Label htmlFor="gender">Gender</Label>
                            <Select name="gender" defaultValue={user.gender}>
                                <SelectTrigger id="gender" className={'w-full'}>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MALE">Male</SelectItem>
                                    <SelectItem value="FEMALE">Female</SelectItem>
                                    <SelectItem value="OTHER">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Weight */}
                        <div className="grid gap-3">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input id="weight" name="weight" type="number" step="0.1" defaultValue={user.weight ? user.weight : 'e.g., 70'} />
                        </div>

                        {/* Height */}
                        <div className="grid gap-3">
                            <Label htmlFor="height">Height (cm)</Label>
                            <Input id="height" name="height" type="number" step="0.1" defaultValue={user.height ? user.height : 'e.g., 180'} />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
