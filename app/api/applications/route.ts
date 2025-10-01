import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';

// Application interface
interface IApplication {
  _id?: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  resume?: string;
  coverLetter?: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Application schema
const ApplicationSchema = new mongoose.Schema<IApplication>({
  jobId: { type: String, required: true },
  jobTitle: { type: String, required: true, trim: true },
  companyName: { type: String, required: true, trim: true },
  applicantName: { type: String, required: true, trim: true },
  applicantEmail: { type: String, required: true, lowercase: true, trim: true },
  applicantPhone: { type: String, trim: true },
  resume: { type: String },
  coverLetter: { type: String },
  status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Get or create the Application model
const Application = mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);

// GET - Fetch all applications
export async function GET() {
  try {
    await dbConnect();
    const applications = await Application.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch applications',
      },
      { status: 500 }
    );
  }
}

// POST - Create new application
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const application = new Application(body);
    await application.save();
    
    return NextResponse.json({
      success: true,
      data: application,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create application',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete application by ID
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Application ID is required',
        },
        { status: 400 }
      );
    }
    
    const deletedApplication = await Application.findByIdAndDelete(id);
    
    if (!deletedApplication) {
      return NextResponse.json(
        {
          success: false,
          error: 'Application not found',
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete application',
      },
      { status: 500 }
    );
  }
}