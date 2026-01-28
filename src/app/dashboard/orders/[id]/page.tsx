"use client"

import { use } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Copy,
  Mail,
  Phone,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Clock,
  Send,
  Plus,
  ExternalLink,
  MessageSquare,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock order data
const orderData = {
  id: "HOA-709",
  status: "processing",
  brand: "Peptide Sciences",
  affiliate: "Health Pro Shop",
  createdAt: "Jan 27, 2026 14:32:15 UTC",
  customer: {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    address: {
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
    },
  },
  lineItems: [
    {
      id: 1,
      brandSku: "PS-BPC157-10",
      hubSku: "HUB-BPC157-10MG",
      name: "BPC-157 10mg",
      quantity: 2,
      price: "$89.99",
      total: "$179.98",
    },
    {
      id: 2,
      brandSku: "PS-TB500-5",
      hubSku: "HUB-TB500-5MG",
      name: "TB-500 5mg",
      quantity: 1,
      price: "$109.99",
      total: "$109.99",
    },
  ],
  subtotal: "$289.97",
  shipping: "$0.00",
  total: "$289.97",
  timeline: [
    {
      id: 1,
      type: "created",
      title: "Order received",
      description: "Order created via Peptide Sciences webhook",
      timestamp: "Jan 27, 2026 14:32:15",
      icon: Package,
    },
    {
      id: 2,
      type: "processing",
      title: "Order processing",
      description: "Order queued for fulfillment",
      timestamp: "Jan 27, 2026 14:32:18",
      icon: Clock,
    },
    {
      id: 3,
      type: "notification",
      title: "Notification sent",
      description: "Fulfillment notification sent to warehouse",
      timestamp: "Jan 27, 2026 14:32:20",
      icon: Send,
    },
  ],
  tracking: null,
}

function getStatusBadge(status: string) {
  switch (status) {
    case "processing":
      return <Badge variant="pending" className="text-sm">Processing</Badge>
    case "completed":
      return <Badge variant="active" className="text-sm">Completed</Badge>
    case "failed":
      return <Badge variant="failed" className="text-sm">Failed</Badge>
    default:
      return <Badge variant="muted" className="text-sm">{status}</Badge>
  }
}

function TimelineIcon({ type }: { type: string }) {
  switch (type) {
    case "created":
      return <Package className="size-4" />
    case "processing":
      return <Clock className="size-4" />
    case "notification":
      return <Send className="size-4" />
    case "shipped":
      return <Truck className="size-4" />
    case "completed":
      return <CheckCircle className="size-4" />
    case "failed":
      return <AlertCircle className="size-4" />
    default:
      return <Clock className="size-4" />
  }
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" asChild>
              <Link href="/dashboard/orders">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-dark-navy font-mono">{id}</h1>
            {getStatusBadge(orderData.status)}
          </div>
          <p className="text-muted-foreground ml-11">
            {orderData.brand} • {orderData.affiliate} • Created {orderData.createdAt}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Copy className="size-4" />
            Copy Order Data
          </Button>
          <Button variant="accent">
            <Send className="size-4" />
            Resend Notification
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Card */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-dark-navy">Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{orderData.customer.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="size-4" />
                      <a href={`mailto:${orderData.customer.email}`} className="hover:text-navy hover:underline">
                        {orderData.customer.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="size-4" />
                      {orderData.customer.phone}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-dark-navy">Shipping Address</h4>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4 mt-0.5 shrink-0" />
                    <div>
                      <p>{orderData.customer.address.line1}</p>
                      {orderData.customer.address.line2 && <p>{orderData.customer.address.line2}</p>}
                      <p>
                        {orderData.customer.address.city}, {orderData.customer.address.state}{" "}
                        {orderData.customer.address.zip}
                      </p>
                      <p>{orderData.customer.address.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Line Items</CardTitle>
              <CardDescription>SKU mapping from brand to hub</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="font-semibold">Brand SKU</TableHead>
                    <TableHead className="font-semibold">→</TableHead>
                    <TableHead className="font-semibold">Hub SKU</TableHead>
                    <TableHead className="font-semibold">Product</TableHead>
                    <TableHead className="font-semibold text-center">Qty</TableHead>
                    <TableHead className="font-semibold text-right">Price</TableHead>
                    <TableHead className="font-semibold text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderData.lineItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm text-navy">
                        {item.brandSku}
                      </TableCell>
                      <TableCell className="text-muted-foreground">→</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {item.hubSku}
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.price}</TableCell>
                      <TableCell className="text-right font-semibold">{item.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="border-t border-border/50 p-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{orderData.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{orderData.shipping}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-navy">{orderData.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Timeline */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.timeline.map((event, index) => (
                  <div key={event.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex size-8 items-center justify-center rounded-full bg-lavender text-navy">
                        <TimelineIcon type={event.type} />
                      </div>
                      {index < orderData.timeline.length - 1 && (
                        <div className="w-px flex-1 bg-border my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tracking */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              {orderData.tracking ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Truck className="size-4 text-navy" />
                    <span className="font-mono text-sm">1Z999AA10123456784</span>
                    <Button variant="ghost" size="icon-xs">
                      <ExternalLink className="size-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    No tracking information yet.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="tracking">Tracking Number</Label>
                    <div className="flex gap-2">
                      <Input id="tracking" placeholder="Enter tracking number" />
                      <Button variant="accent">
                        <Plus className="size-4" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dispute */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Dispute</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  No disputes filed for this order.
                </p>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="size-4" />
                  Open Dispute
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
