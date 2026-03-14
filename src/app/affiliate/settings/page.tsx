'use client';

import * as React from 'react';
import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';
import { RiLoader4Line, RiCheckLine, RiErrorWarningLine } from '@remixicon/react';
import { affiliateApi } from '@/lib/api-client';

export default function AffiliateSettingsPage() {
  const [profile, setProfile] = React.useState<any>(null);
  const [formData, setFormData] = React.useState<any>({
    fullName: '',
    email: '',
    phone: '',
    socialProfile: ''
  });
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{ type: 'success' | 'error', message: string } | null>(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await affiliateApi.getProfile();
        setProfile(data);

        // Handle socialProfile if it's an object or string
        let socialUrl = '';
        if (data.socialProfile) {
          if (typeof data.socialProfile === 'object') {
            socialUrl = Object.values(data.socialProfile)[0] as string || '';
          } else {
            socialUrl = data.socialProfile;
          }
        }

        setFormData({
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          socialProfile: socialUrl
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    try {
      // Prepare payload: wrap socialProfile string into an object if it exists
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        socialProfile: formData.socialProfile ? { url: formData.socialProfile } : {}
      };

      await affiliateApi.updateProfile(payload);
      setFeedback({ type: 'success', message: 'Profile updated successfully!' });
      setTimeout(() => setFeedback(null), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setFeedback({ type: 'error', message: 'Failed to update profile. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='flex h-64 items-center justify-center text-text-soft-400'>
        <RiLoader4Line className='size-8 animate-spin' />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <PageHeader title='Settings' description='Manage your affiliate profile and preferences' />

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-8 shadow-regular-xs'>
        <div className='max-w-xl'>
          <h3 className='text-label-lg text-text-strong-950 font-semibold mb-6'>Profile Information</h3>

          <form onSubmit={handleSave} className='space-y-5'>
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950 font-medium'>Full Name</label>
                <input
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder='Your full name'
                  className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 transition-all'
                />
              </div>
              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950 font-medium'>Email Address</label>
                <input
                  name='email'
                  type='email'
                  value={formData.email}
                  disabled
                  className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-weak-50 px-3 text-paragraph-sm text-text-sub-600 shadow-custom-input focus:outline-none cursor-not-allowed'
                />
                <p className='text-[10px] text-text-soft-400'>Email cannot be changed.</p>
              </div>
              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950 font-medium'>Phone Number</label>
                <input
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='+1 (555) 000-0000'
                  className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 transition-all'
                />
              </div>
              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950 font-medium'>Social Profile</label>
                <input
                  name='socialProfile'
                  value={formData.socialProfile}
                  onChange={handleChange}
                  placeholder='https://instagram.com/yourprofile'
                  className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 transition-all'
                />
              </div>
            </div>

            <div className='pt-2 flex items-center gap-4'>
              <Button type='submit' disabled={saving}>
                {saving && <RiLoader4Line className='size-4 animate-spin' />}
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>

              {feedback && (
                <div className={`flex items-center gap-1.5 text-label-xs ${feedback.type === 'success' ? 'text-success-base' : 'text-error-base'} animate-in fade-in slide-in-from-left-2`}>
                  {feedback.type === 'success' ? <RiCheckLine className='size-4' /> : <RiErrorWarningLine className='size-4' />}
                  {feedback.message}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-8 shadow-regular-xs opacity-50 pointer-events-none'>
        <h3 className='text-label-lg text-text-strong-950 font-semibold mb-2'>Notification Settings</h3>
        <p className='text-paragraph-sm text-text-sub-600 mb-6'>Manage how you receive alerts and updates.</p>
        <div className='space-y-4'>
          <div className='flex items-center justify-between py-2 border-b border-stroke-soft-100'>
            <div>
              <p className='text-label-sm text-text-strong-950'>New Sale Alerts</p>
              <p className='text-paragraph-xs text-text-sub-600'>Get notified when someone uses your link or code.</p>
            </div>
            <div className='h-5 w-10 rounded-full bg-bg-weak-50 border border-stroke-soft-200' />
          </div>
          <div className='flex items-center justify-between py-2'>
            <div>
              <p className='text-label-sm text-text-strong-950'>Payout Notifications</p>
              <p className='text-paragraph-xs text-text-sub-600'>Receive an email when a payout is processed.</p>
            </div>
            <div className='h-5 w-10 rounded-full bg-bg-weak-50 border border-stroke-soft-200' />
          </div>
        </div>
      </div>
    </div>
  );
}
