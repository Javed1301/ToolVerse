import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex justify-center items-center">
      <SignUp 
        appearance={{
            elements: {
                // Main Card
                card: 'bg-base-100 shadow-xl border border-base-300 rounded-xl p-6',
                
                // Typography
                headerTitle: 'text-2xl font-bold text-base-content',
                headerSubtitle: 'text-base-content/60',
                
                // Form Inputs
                formFieldLabel: 'text-sm font-medium text-base-content',
                formFieldInput: 'input input-bordered w-full bg-base-200 focus:input-primary text-base-content mt-1',
                
                // Primary Button
                formButtonPrimary: 'btn btn-primary w-full normal-case text-lg mt-2',
                
                // Social Buttons
                socialButtonsBlockButton: 'btn btn-outline w-full hover:bg-base-300 normal-case flex gap-2',
                socialButtonsBlockButtonText: 'text-base-content font-medium',
                
                // Footer Links
                footerActionLink: 'link link-primary no-underline hover:underline',
                footerActionText: 'text-base-content/60',
                
                // Divider
                dividerLine: 'bg-base-300 h-px',
                dividerText: 'text-base-content/40 bg-base-100 px-2'
            },
            layout: {
                socialButtonsPlacement: 'top',
                socialButtonsVariant: 'blockButton'
            }
        }}
      />
    </div>
  )
}